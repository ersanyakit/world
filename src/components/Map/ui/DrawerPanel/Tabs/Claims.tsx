import { Unicon } from "#components/Unicon";
import { useChainId } from "#src/context/ChainIdProvider";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Claim } from "#src/types/Contribution"
import { Token } from "#src/types/web3.types";
import { getTokenByAddress } from "#src/utils/helpers";
import { formatUnits } from "ethers";
import { useState } from "react";

export const ClaimTAB = () => {
    const { contributions, players, claims, assets } = useContributionContext();

    const ClaimCard = ({ claim,index }: { index:number, claim: Claim }) => {
          const chainId = useChainId()
    
        const [token,setToken] = useState<Token | null>(getTokenByAddress(chainId, claim.token))
        return (
            <div className="w-full rounded-lg bg-black/30 hover:bg-black/50 p-2 flex flex-col gap-2">


                            <div className="w-full flex flex-row gap-2 items-center justify-start">
                                <div className="animate-spin bg-black/20 shadow-small border-1 border-success-100 rounded-full p-2">
                                    <Unicon size={24} address={claim.player} randomSeed={Number(index)} />
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <span className='text-sm font-bold text-lime-500'>{"Millionarie"}</span>
                                    <span className='text-xs font-sans  text-fuchsia-400'>{claim.player}</span>
                                </div>

                            </div>

               

                <div className="w-full grid grid-cols-4">
                <div className="w-full flex flex-col gap-2 items-start justify-center">
                    <span className="text-xs text-purple-500">Amount</span>
                    <span className="text-xs text-lime-500">{parseFloat(formatUnits(claim.amount,token ? token?.decimals : 18)).toFixed(4)}</span>
                </div>
                <div className="w-full flex flex-col gap-2 items-start justify-center">
                    <span className="text-xs text-purple-500">Token</span>
                    <span className="text-xs text-lime-500">{token?.name}</span>
                </div>

                <div className="w-full flex flex-col gap-2 items-start justify-center">
                    <span className="text-xs text-purple-500">Symbol</span>
                    <span className="text-xs text-lime-500">{token?.symbol}</span>
                </div>

                <div className="w-full flex flex-col gap-2 items-start justify-center">
                    <span className="text-xs text-purple-500">Decimals</span>
                    <span className="text-xs text-lime-500">{token?.decimals}</span>
                </div>
                </div>
            </div>
        )
    }


    return (
        <>

            <div className='w-full flex flex-col gap-2 py-2'>
                {claims.slice().reverse().map((claim, index) => (
                    <ClaimCard index={index} key={index} claim={claim} />
                ))}
            </div>
        </>
    )
}
