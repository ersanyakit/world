import { useChainId } from "#src/context/ChainIdProvider";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { DEFAULT_TOKEN_LOGO, TradeType } from "#src/entities/utils/misc";
import { BalanceInfo } from "#src/types/Contribution";
import { Token } from "#src/types/web3.types";
import { getTokenByAddress } from "#src/utils/helpers";
import { Button, Card, CardBody, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, User } from "@nextui-org/react"
import { useAppKitNetwork } from "@reown/appkit/react";
import { formatUnits } from "ethers";
import { CircleArrowOutDownLeft, CircleArrowOutDownRight, CircleArrowOutUpLeft, Mouse, MousePointerClick, RefreshCcwDot, Repeat } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const Trade = () => {
    const [baseAsset, setBaseAsset] = useState<Token | null>(null)
    const [quoteAsset, setQuoteAsset] = useState<Token | null>(null)
    const [baseInputValue, setBaseInputValue] = useState("")
    const [quoteInputValue, setQuoteInputValue] = useState("")

  const {balances, location, contributions, players, claims, assets,addLocation } = useContributionContext();
  const [tokenSelector, setTokenSelector] = useState<{ showTokenSelector: boolean, side: TradeType }>({
    showTokenSelector: false,
    side: TradeType.EXACT_INPUT,
  });


  type TokenListProps = {
    disabledToken:Token | null
    onSelect: (token: Token | null,balance:BalanceInfo) => void; // onSelect parametresini tip olarak belirliyoruz
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
      if (disabledToken && balanceItem.token === disabledToken.address) {
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

  return <div className="w-full grid grid-cols-3 gap-2">{memoizedBalances}</div>;
};
  const handleSelectToken = (token:Token | null,balanceInfo:BalanceInfo) => {
    console.log(token)
    console.log(balanceInfo)
    if(!token){
        return;
    }

    if(tokenSelector.side == TradeType.EXACT_INPUT){
        setBaseAsset(token)
    }else if(tokenSelector.side == TradeType.EXACT_OUTPUT){
        setQuoteAsset(token)
    }
    setTokenSelector(prevState => ({
        ...prevState,
        showTokenSelector: false
      }));
    
  }

  const handleSwapAssets = () => {
    setBaseAsset((prevBaseAsset) => {
        setQuoteAsset(prevBaseAsset);
        return quoteAsset; // Swap the base and quote assets
      });
  }

  const setInputValue = (e : any, side:TradeType) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    e = e.replace(",", ".")
    if (regex.test(e)) {
        if (side==TradeType.EXACT_INPUT) {
            setBaseInputValue(e)
        } else {
            setQuoteInputValue(e)
        }
    }

     
}


    return (
        <div className="relative w-full flex flex-col gap-2">

            <Input
             value={baseInputValue} onChange={(e) => {
              setInputValue(e.target.value, TradeType.EXACT_INPUT)
            }} 
            label={`Input ${baseAsset ? baseAsset.symbol : ""}`}
           endContent={
            <Image removeWrapper src={baseAsset ? baseAsset.logoURI : DEFAULT_TOKEN_LOGO}  radius="full" className="w-10 h-10 p-1 border border-2 border-default text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
            <div className="absolute w-full flex flex-row top-[45px] z-[20] items-center flex flex-row gap-2 justify-center">
                <div className="flex flex-row gap-2 items-center justify-center  rounded-full">
                <Button onPress={()=>{
                    setTokenSelector(prevState => ({
                        ...prevState,
                        showTokenSelector: true,
                        side:TradeType.EXACT_INPUT
                      }));
                }} variant="faded" size="md" radius="full" isIconOnly>
                <CircleArrowOutUpLeft  size={18} />
                </Button>
                <Button onPress={()=>{
                    handleSwapAssets()
                }} variant="faded" size="lg" radius="full" isIconOnly>
                <RefreshCcwDot />
                </Button>
                <Button onPress={()=>{
                    setTokenSelector(prevState => ({
                        ...prevState,
                        showTokenSelector: true,
                        side:TradeType.EXACT_OUTPUT
                      }));
                }} variant="faded" size="md" radius="full" isIconOnly>
                <CircleArrowOutDownRight size={18} />
                </Button>
                </div>
            </div>
            {
                tokenSelector.showTokenSelector && <div className="relative z-[999] bg-blur w-full flex flex-col gap-2 p-2 pt-10">
                <TokenList disabledToken={tokenSelector.side == TradeType.EXACT_INPUT ? quoteAsset : baseAsset} onSelect={handleSelectToken}/>
            </div>
            }
            
            <Input 
              value={quoteInputValue} onChange={(e) => {
                setInputValue(e.target.value, TradeType.EXACT_OUTPUT)
              }} 
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
              }}  endContent={
            <Image removeWrapper radius="full" src={quoteAsset ? quoteAsset.logoURI : DEFAULT_TOKEN_LOGO} className="w-10 h-10 p-1 border border-2 border-default text-default-400 pointer-events-none flex-shrink-0" />
          } radius="full" variant="faded" label={`Output ${quoteAsset ? quoteAsset.symbol : ""}`} size={"lg"} type="text" />


        </div>
    )
}

export default Trade;
