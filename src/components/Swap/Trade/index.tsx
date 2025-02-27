import Cobe from "#components/Cobe";
import NoItemAvailable from "#components/NoItemAvailable";
import { useChainId } from "#src/context/ChainIdProvider";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { CHILIZWRAPPER, Currency, CurrencyAmount, Pair, Percent, Route, Token as TokenEntity, Trade as TradeEntity, WETH9 } from "#src/entities";
import { DECENTRALIZED_EXCHANGES, DEFAULT_TOKEN_LOGO, INITIAL_ALLOWED_SLIPPAGE, MINIMUM_LIQUIDITY, TradeType } from "#src/entities/utils/misc";
import { approve, fetchPairs, getContractByName, swap, swapAll } from "#src/hooks/useContractByName";
import { BalanceInfo, PairInfo, Router, TCustomPair, TradeItemProps } from "#src/types/Contribution";
import { Token } from "#src/types/web3.types";
import { getTokenByAddress } from "#src/utils/helpers";
import { Badge, Button, Card, CardBody, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, useDisclosure, User } from "@nextui-org/react"
import { useAppKitAccount, useAppKitNetwork, useAppKitProvider } from "@reown/appkit/react";
import { ethers, formatUnits, getAddress, parseUnits } from "ethers";
import JSBI from "jsbi";
import { ChevronsRight, CircleArrowOutDownLeft, CircleArrowOutDownRight, CircleArrowOutUpLeft, CirclePercent, GitCompareArrows, Mouse, MousePointerClick, RedoDot, RefreshCcwDot, Repeat, ScanEye, ScanSearch, Shuffle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from 'lodash.debounce';

const Trade = () => {

  const { balances, baseBalance, quoteBalance, addBaseTokenBalance, addQuoteTokenBalance, addSwapInputValue, swapInputAmount, baseToken, quoteToken, addBaseToken, addQuoteToken } = useContributionContext();
  const [swapInputValue,setSwapInputValue] = useState<string>("")
  const [quoteInputValue, setQuoteInputValue] = useState("")
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const [tokenSelector, setTokenSelector] = useState<{ showTokenSelector: boolean, side: TradeType }>({
    showTokenSelector: false,
    side: TradeType.EXACT_INPUT,
  });


  type TokenListProps = {
    disabledToken: Token | null
    onSelect: (token: Token | null, balance: BalanceInfo) => void; // onSelect parametresini tip olarak belirliyoruz
  };
  const TokenList: React.FC<TokenListProps> = ({ disabledToken, onSelect }) => {
    const [tokens, setTokens] = useState<Record<string, Token | null>>({});
    const { chainId: chainIdProvider } = useAppKitNetwork();
    const chainIdInput = useChainId();
    const chainId: number = chainIdProvider ? Number(chainIdProvider) : chainIdInput;

    // Fetch tokens in useEffect
    useEffect(() => {
      balances.forEach((balanceItem: BalanceInfo) => {
        const tokenAddress = balanceItem.token;
        if (!tokens[tokenAddress]) {
          const fetchedToken = getTokenByAddress(chainId, tokenAddress);
          setTokens((prevTokens) => ({
            ...prevTokens,
            [tokenAddress]: fetchedToken,
          }));
        }
      });
    }, [chainId, balances, tokens]);

    // Memoize balances map
    const memoizedBalances = useMemo(() => {
      return balances.map((balanceItem: BalanceInfo, index) => {
        const token = tokens[balanceItem.token];

        // Check if the current token is the disabled token

        if ((getAddress(balanceItem.token) === getAddress(getContractByName("TOKEN", chainId).address))) {
          return null
        }
        if ((disabledToken && balanceItem.token === disabledToken.address)) {
          return null; // Skip rendering this token
        }

        return (
          <Button
            key={`balance${index}`}
            className="px-2 border border-1 border-white/30 hover:border-white"
            fullWidth
            variant="flat"
            onPress={() => {
              onSelect(token, balanceItem);
            }}
            radius="full"
          >
            <div className="w-full flex flex-row gap-2 items-center justify-start">
              <Image
                removeWrapper
                radius="full"
                className="border border-1 border-default w-[32px] h-[32px] min-w-[32px] min-h-[32px] max-h-[32px] max-w-[32px]"
                src={token?.logoURI}
              />
              <div className="flex flex-col gap-0 text-start">
                <span className="w-full text-xs">{token?.symbol}</span>
                <span className="w-full text-[9px]">
                  {parseFloat(formatUnits(balanceItem.balance, balanceItem.decimals)).toFixed(4)}
                </span>
              </div>
            </div>
          </Button>
        );
      });
    }, [balances, tokens, disabledToken]);

    return <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2">{memoizedBalances}</div>;
  };
  const handleSelectToken = (token: Token | null, balanceInfo: BalanceInfo) => {
    if (!token) {
      return;
    }

    if (tokenSelector.side == TradeType.EXACT_INPUT) {
      addBaseToken(token)
      addBaseTokenBalance(balanceInfo)
    } else if (tokenSelector.side == TradeType.EXACT_OUTPUT) {
      addQuoteToken(token)
      addQuoteTokenBalance(balanceInfo)
    }
    setTokenSelector(prevState => ({
      ...prevState,
      showTokenSelector: false
    }));

  }

  const handleSwapAssets = () => {

    addBaseToken(quoteToken);  // quote token'ı base token olarak ayarla
    addQuoteToken(baseToken);  // base token'ı quote token olarak ayarla

    addBaseTokenBalance(quoteBalance)
    addQuoteTokenBalance(baseBalance)

  }

  const setInputValue = (e: any, side: TradeType) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    e = e.replace(",", ".")
    if (regex.test(e)) {
      if (side == TradeType.EXACT_INPUT) {
        setSwapInputValue(e)
        //addSwapInputValue(e)
      } else {
        //setQuoteInputValue(e)
      }
    }
  }





  const TradeContainer = () => {
    const { chainId: chainIdProvider } = useAppKitNetwork();
    const chainIdInput = useChainId();
    const chainId: number = chainIdProvider ? Number(chainIdProvider) : chainIdInput;

    const [tradingPairs, setTradingPairs] = useState<TCustomPair[]>([])


    const TradeItem: React.FC<TradeItemProps> = ({ pair }) => {
      const [expanded, setExpanded] = useState<boolean>(false)
      const handleSwap = async () => {

        if (!baseToken) {
          return
        }

        if (!quoteToken) {
          return
        }

        let inputAmount = parseUnits(swapInputAmount, baseToken.decimals);
        let outputAmount = parseUnits(pair.outputAmount, quoteToken?.decimals)
        let WRAPPER = CHILIZWRAPPER[chainId].address

        if (baseToken.address != ethers.ZeroAddress) {
          let approvalResponse = await approve(chainId, walletProvider, isConnected, baseToken, ethers.MaxUint256)
          if (!approvalResponse.success) {
            // return
          }
        }

        let swapResponse = await swap(chainId, walletProvider, isConnected, address, pair, WRAPPER, baseToken, quoteToken, inputAmount, outputAmount)
        if (!swapResponse.success) {
          return
        }


      }

      return (<div className=" group  flex flex-col items-center justify-center">

        <div className=" w-full cursor-pointer  border-b-0 bg-white/30 group-hover:bg-white/50 border border-1 border-default group-hover:border-white rounded-full flex items-center justify-center p-2">
          <div className="w-full flex flex-row items-center justify-center gap-2">
            <div className="w-full flex flex-row gap-2 items-center justify-start">
              <Button onPress={() => {
                setExpanded(!expanded)
              }} color="default"
                className="border border-1 border-white/30 hover:border-white"
                variant="light" radius="full" size="lg" isIconOnly>
                {expanded ? <ScanSearch /> : <ScanEye />}
              </Button>
              <Image src={pair.exchangeInfo.logo} className="min-w-10 min-h-10 w-10 h-10 border border-1 border-default p-1 rounded-full" />
              <div className="flex flex-col items-center justify-start">
                <div className="w-full flex flex-col items-start justify-center">
                  <span className="text-sm">{pair.exchangeInfo.dex}</span>
                  <span className="px-2 text-xs rounded-lg bg-danger-500 text-white">{pair.trade.priceImpact.toFixed(2)}%</span>
                </div>


              </div>
            </div>
            <div className="w-full flex flex-row gap-2 items-center justify-end">
              <div className="w-full  flex flex-col sm:flex-row items-center justify-end gap-2   rounded-lg p-2">
                <span className="sm:text-sm text-xs ">{pair.outputAmount}</span>
                <span className="sm:text-xs text-[8px]">{quoteToken?.symbol}</span>
              </div>
              <Button onPress={() => {
                handleSwap()
              }} color="danger" variant="light" radius="full" size="lg" isIconOnly>
                <ChevronsRight />
              </Button>
            </div>

          </div>
        </div>
        {
          expanded && <div className=" w-full bg-white/30 group-hover:bg-white/50  border-t-0 border border-1 border-default group-hover:border-white max-w-[80%] justify-center items-center rounded-b-lg text-sm  flex flex-col gap-2 p-2">

            <div className="w-full flex flex-col gap-2 p-2">
              <span className="text-sm">Price</span>
              <div className="w-full grid grid-cols-2 items-center p-1">

                <div className="w-full flex flex-row items-center justify-start gap-2 ">
                  <img className="w-5 h-5" src={baseToken?.logoURI} alt={baseToken?.symbol} />
                  <small className="text-sm">{pair.trade.executionPrice.invert().toSignificant()} {baseToken?.symbol} per {quoteToken?.symbol}</small>
                </div>
                <div className="flex flex-row items-center justify-start gap-2">
                  <img className="w-5 h-5" src={quoteToken?.logoURI} alt={quoteToken?.symbol} />
                  <small className=" text-sm">{pair.trade.executionPrice.toSignificant()}  {quoteToken?.symbol} per {baseToken?.symbol}</small>
                </div>

              </div>
            </div>


            <div className="w-full flex flex-col gap-2 p-2">
              <span className="text-sm">Liquidity</span>
              <div className="w-full grid grid-cols-2 items-center justify-center">
                <div className="flex flex-row gap-2">
                  <Image src={baseToken?.logoURI} className="w-5 h-5 border border-1 border-default  rounded-full" />
                  <span className="text-sm">{pair.baseLiqudity} {baseToken?.symbol}</span>
                </div>
                <div className="flex flex-row gap-2">
                  <Image src={quoteToken?.logoURI} className="w-5 h-5 border border-1 border-default rounded-full" />
                  <span className="text-sm">{pair.quoteLiquidity} {quoteToken?.symbol} </span>
                </div>
              </div>
            </div>

          </div>
        }

      </div>)
    }



    const getRoutersByChainId = (chainId: number): Router[] => {
      return DECENTRALIZED_EXCHANGES.filter((exchange: any) => exchange.chainId === chainId).map((exchange) => ({
        router: exchange.router,
        weth: exchange.weth,
      }));
    };

    const getExchangeByRouterAndWETH = (routerAddress: string, wethAddress: string): any | undefined => {
      return DECENTRALIZED_EXCHANGES.find(
        (exchange: any) =>
          exchange.chainId === chainId &&
          exchange.router.toLowerCase() === routerAddress.toLowerCase() &&
          exchange.weth.toLowerCase() === wethAddress.toLowerCase()
      );
    };

   

    const handleFetchPairs = async () => {
      if (!baseToken) { return }
      if (!quoteToken) { return }
      if (!swapInputAmount) { return }


      const routers = getRoutersByChainId(chainId);
      const depositAmount = ethers.parseUnits(swapInputAmount, baseToken.decimals)

      const tokenBase: Token = {
        ...baseToken,
        address: baseToken.address === ethers.ZeroAddress ? WETH9[chainId].address : baseToken.address,
      };

      const tokenQuote: Token = {
        ...quoteToken,
        address: quoteToken.address === ethers.ZeroAddress ? WETH9[chainId].address : quoteToken.address,
      };

      console.log("selectedBase","ChainId",chainId,depositAmount,baseToken,tokenBase,quoteToken,tokenQuote)
      const wrapper = CHILIZWRAPPER[chainId].address
      const _tradingPairs: PairInfo[] = await fetchPairs(chainId, routers, wrapper, tokenBase, tokenQuote, depositAmount)

      console.log("_tradingPairs", _tradingPairs)
      const customPairs: TCustomPair[] = []; // Custom pair dizisi oluşturuluyor

      const _validPairs: PairInfo[] = []
      for (let i = 0; i < _tradingPairs.length; i++) { // Döngü başlatılıyor
        let pair: PairInfo = _tradingPairs[i]
        if (pair.valid) {
          if (_validPairs.some((p) => p.pair === pair.pair)) {
            continue;
          }
          _validPairs.push(pair);
        }
      }


      for (let i = 0; i < _validPairs.length; i++) { // Döngü başlatılıyor
        let pair: PairInfo = _validPairs[i]
        if (!pair.valid) {
          continue;
        }


        let _selectedBaseAddress = baseToken.address === ethers.ZeroAddress ? pair.weth : baseToken.address
        let _selectedQuoteAddress = quoteToken.address === ethers.ZeroAddress ? pair.weth : quoteToken.address
        let selectedBase: any
        let selectedQuote: any

        if (_selectedBaseAddress == pair.weth) {
          [selectedBase, selectedQuote] = _selectedBaseAddress == pair.token0 ? [pair.token0, pair.token1] : [pair.token1, pair.token0]
        } else if (_selectedQuoteAddress == pair.weth) {
          [selectedBase, selectedQuote] = _selectedQuoteAddress == pair.token0 ? [pair.token1, pair.token0] : [pair.token0, pair.token1]
        } else {
          [selectedBase, selectedQuote] = [_selectedBaseAddress, _selectedQuoteAddress]
        }

        let _baseAddress = ethers.getAddress(selectedBase);
        let _quoteAddress = ethers.getAddress(selectedQuote);




        let _baseDecimals = Number(pair.token0 == _baseAddress ? pair.token0Decimals : pair.token1Decimals)
        let _quoteDecimals = Number(pair.token1 == _quoteAddress ? pair.token1Decimals : pair.token0Decimals)
        const baseTokenEntity = new TokenEntity(baseToken.chainId, _baseAddress, _baseDecimals, baseToken.symbol)
        const quoteTokenEntity = new TokenEntity(quoteToken.chainId, _quoteAddress, _quoteDecimals, quoteToken.symbol)
        const [baseReserve, quoteReserve] = _baseAddress == pair.token0 ? [pair.reserve0, pair.reserve1] : [pair.reserve1, pair.reserve0]



        let _checkBaseLiquidty = CurrencyAmount.fromRawAmount(baseTokenEntity, baseReserve.toString())
        let _checkQuuteLiquidity = CurrencyAmount.fromRawAmount(quoteTokenEntity, quoteReserve.toString())


        if (JSBI.lessThanOrEqual(_checkBaseLiquidty.quotient, MINIMUM_LIQUIDITY)) {
          continue;
        }

        if (JSBI.lessThanOrEqual(_checkQuuteLiquidity.quotient, MINIMUM_LIQUIDITY)) {
          continue;
        }

        const exchangePair = new Pair(
          CurrencyAmount.fromRawAmount(baseTokenEntity, baseReserve.toString()),
          CurrencyAmount.fromRawAmount(quoteTokenEntity, quoteReserve.toString()))



        const baseAmount: CurrencyAmount<TokenEntity> = CurrencyAmount.fromRawAmount(baseTokenEntity, JSBI.BigInt(ethers.parseUnits(swapInputAmount, Number(_baseDecimals)).toString()));

        let _tradeInfo = new TradeEntity(
          new Route([exchangePair], baseTokenEntity, quoteTokenEntity),
          CurrencyAmount.fromRawAmount(baseTokenEntity, baseAmount.quotient),
          TradeType.EXACT_INPUT
        )

        let _baseLiquidity = CurrencyAmount.fromRawAmount(baseTokenEntity, baseReserve.toString()).toSignificant(6)
        let _quoteLiquidity = CurrencyAmount.fromRawAmount(quoteTokenEntity, quoteReserve.toString()).toSignificant(6)

        const DEFAULT_ADD_SLIPPAGE_TOLERANCE = new Percent(INITIAL_ALLOWED_SLIPPAGE, 10_000)
        const amountOutSlippage = _tradeInfo.minimumAmountOut(DEFAULT_ADD_SLIPPAGE_TOLERANCE)


        var output = 0
        let price = parseFloat(_tradeInfo.executionPrice.toSignificant());
        let baseInput = parseFloat(swapInputAmount);
        output = price * baseInput
        let outputAmount = amountOutSlippage.toSignificant(6)

        let exchangeInfo = getExchangeByRouterAndWETH(pair.router, pair.weth)

        if (parseFloat(_tradeInfo.priceImpact.toFixed(2)) < 10) {
          customPairs.push({ pair: pair, isSelected: false, trade: _tradeInfo, baseLiqudity: _baseLiquidity, quoteLiquidity: _quoteLiquidity, exchangeInfo: exchangeInfo, outputAmount: outputAmount })

        }


      }

      setTradingPairs(customPairs);
    }
    useEffect(() => {
      const fetchPairsAsync = async () => {
        await handleFetchPairs();
      };
      fetchPairsAsync();
    }, [swapInputAmount,balances]);



    

    const handleSwapAll = async () => {

      if (!baseToken) {
        return
      }

      if (!quoteToken) {
        return
      }

      let inputAmount = parseUnits(swapInputAmount, baseToken.decimals);


      let WRAPPER = CHILIZWRAPPER[chainId].address

      if (baseToken.address != ethers.ZeroAddress) {
        let approvalResponse = await approve(chainId, walletProvider, isConnected, baseToken, ethers.MaxUint256)
        if (!approvalResponse.success) {
        }
      }



      let swapResponse = await swapAll(chainId, walletProvider, isConnected, address, tradingPairs, WRAPPER, baseToken, quoteToken, inputAmount)
      if (!swapResponse.success) {
        return
      }


    }

    return (<ScrollShadow hideScrollBar className="z-[999] max-h-[550px]">
      <div

        className="w-full flex flex-col gap-2">

        {tradingPairs.length > 0 && (
          <>
            {tradingPairs.map((pair, index) => (
              <TradeItem
                key={`pair${index}`}
                pair={pair}
              />
            ))}
            <Button
              radius="full"
              onPress={handleSwapAll}
              fullWidth
              size="lg"
              color="danger"
            >
              Swap All
            </Button>
          </>
        )}





        <div className={tradingPairs.length > 0 ? "hidden" : "w-full"}>
          <Cobe />

        </div>
      </div>




    </ScrollShadow>)
  }

  const setTradeInputPercent = (percent: number) => {
    // `baseBalance` nesnesinin yapısı ve türlerini kontrol ediyoruz
    let etherBalance: string = baseBalance
      ? formatUnits(baseBalance?.balance, baseBalance?.decimals)
      : "0.00";

    // `parseFloat` sonucu kesin olarak `number` türünde
    let balance: number = parseFloat(etherBalance);

    if (typeof balance !== "number" || isNaN(balance)) {
      console.error("Balance is not a valid number");
      return 0; // Hata durumunda güvenli bir değer döndürüyoruz
    }

    // Yüzde hesaplaması
    let calculatedAmount = ((balance * percent) / 100).toFixed(4);
    setInputValue(calculatedAmount, TradeType.EXACT_INPUT)
  };

  const debouncedSetInputValue = useCallback(
    debounce((val) => {
      console.log('Input Value Debounced:', val);

      addSwapInputValue(val)
    }, 500), // Debounce süresi
    [] // Bu hook'un yalnızca bir kez oluşturulmasını sağlıyoruz
  );

  return (
    <div className="relative w-full max-w-2xl flex flex-col gap-2">

      <div className="w-full">
        <Input
        onChange={(val)=>{
          setInputValue(val.target.value, TradeType.EXACT_INPUT)
          debouncedSetInputValue(val.target.value)
        }}
          value={swapInputValue} 
          label={`Input ${baseToken ? baseToken.symbol : ""}`}
          endContent={
            <div className="flex flex-row gap-2 items-center justify-center">
              <Button onPress={() => {
                setTokenSelector(prevState => ({
                  ...prevState,
                  showTokenSelector: true,
                  side: TradeType.EXACT_INPUT
                }));
              }} size="md" variant="light" isIconOnly radius="full">
                <Image removeWrapper src={baseToken ? baseToken.logoURI : DEFAULT_TOKEN_LOGO} radius="full" className="w-10 h-10 p-1 border border-2 border-default text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              </Button>
              <Button onPress={() => {
                handleSwapAssets()
              }} size="md" variant="light" isIconOnly radius="full">
                <GitCompareArrows />
              </Button>
              <Button onPress={() => {
                setTokenSelector(prevState => ({
                  ...prevState,
                  showTokenSelector: true,
                  side: TradeType.EXACT_OUTPUT
                }));
              }} size="md" variant="light" isIconOnly radius="full">
                <Image removeWrapper src={quoteToken ? quoteToken.logoURI : DEFAULT_TOKEN_LOGO} radius="full" className="w-10 h-10 p-1 border border-2 border-default text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              </Button>

            </div>
          }
          fullWidth variant="faded"
          radius="full"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-sm",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          className="w-full flex flex-col gap-2 items-center justify-center"
          size={"lg"} type="text" />

      </div>

      <div className="w-full flex flex-col gap-2 p-2">
        <div className="grid grid-cols-2">
          <div className="w-full flex flex-row gap-2 items-center justify-start">
            <Image className="w-8 h-8" src={baseToken?.logoURI} />
            <span>{baseBalance ? parseFloat(formatUnits(baseBalance?.balance, baseBalance?.decimals)).toFixed(4) : ""} {baseToken?.symbol}</span>
          </div>

          <div className="w-full flex flex-row items-center justify-end gap-2">



            <Badge isOneChar color="default" className="bg-white/60 border-1 border-white/30" content={<CirclePercent className="text-black/50" />} placement="top-right">

              <Button
                className="max-w-[40px] min-w-[40px] min-h-[40px] border border-1 border-white/30 hover:border-white"
                fullWidth
                size="sm"
                variant="flat"
                onPress={() => {
                  setTradeInputPercent(25)
                }}
                radius="full"
              >
                25

              </Button>
            </Badge>


            <Badge isOneChar color="default" className="bg-white/60 border-1 border-white/30" content={<CirclePercent className="text-black/50" />} placement="top-right">

              <Button
                className="max-w-[40px] min-w-[40px] min-h-[40px] border border-1 border-white/30 hover:border-white"
                fullWidth
                size="sm"
                variant="flat"
                onPress={() => {
                  setTradeInputPercent(50)
                }}
                radius="full"
              >
                50

              </Button>
            </Badge>


            <Badge isOneChar color="default" className="bg-white/60 border-1 border-white/30" content={<CirclePercent className="text-black/50" />} placement="top-right">

              <Button
                className="max-w-[40px] min-w-[40px] min-h-[40px] border border-1 border-white/30 hover:border-white"
                fullWidth
                size="sm"
                variant="flat"
                onPress={() => {
                  setTradeInputPercent(75)

                }}
                radius="full"
              >
                75

              </Button>
            </Badge>


            <Badge isOneChar color="default" className="bg-white/60 border-1 border-white/30" content={<CirclePercent className="text-black/50" />} placement="top-right">

              <Button
                className="max-w-[40px] min-w-[40px] min-h-[40px] border border-1 border-white/30 hover:border-white"
                fullWidth
                size="sm"
                variant="flat"
                onPress={() => {
                  setTradeInputPercent(100)

                }}
                radius="full"
              >
                100

              </Button>
            </Badge>

          </div>
        </div>



      </div>
      {
        tokenSelector.showTokenSelector && <div className="relative z-[999] bg-blur w-full flex flex-col gap-2 p-2 pt-2">
          <TokenList disabledToken={tokenSelector.side == TradeType.EXACT_INPUT ? quoteToken : baseToken} onSelect={handleSelectToken} />
        </div>
      }

      <div className="w-full flex flex-col gap-5">
        {!tokenSelector.showTokenSelector && <TradeContainer />}
      </div>





    </div>
  )
}

export default Trade;
