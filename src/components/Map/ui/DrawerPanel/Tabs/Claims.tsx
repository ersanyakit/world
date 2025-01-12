import { useContributionContext } from "#src/context/GlobalStateContext";
import { Claim } from "#src/types/Contribution"
import { Token } from "#src/types/web3.types";
import { getTokenByAddress } from "#src/utils/helpers";
import { formatUnits } from "ethers";
import { useState } from "react";

export const ClaimTAB = () => {
    const { contributions, players, claims, assets } = useContributionContext();

    const ClaimCard = ({ claim }: { claim: Claim }) => {
        const [token,setToken] = useState<Token | null>(getTokenByAddress(claim.token))
        return (
            <div className="w-full rounded-lg bg-black/30 hover:bg-black/50 p-2 flex flex-col gap-2">

                <div className="w-full flex flex-col gap-2 items-start justify-center">
                    <span className="text-xs text-purple-500">Player</span>
                    <span className="text-xs text-lime-500">{claim.player}</span>
                </div>

                <div className="w-full flex flex-col gap-2 items-start justify-center">
                    <span className="text-xs text-purple-500">Amount</span>
                    <span className="text-xs text-lime-500">{formatUnits(claim.amount,token ? token?.decimals : 18)}</span>
                </div>

                <div className="w-full grid grid-cols-3">

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
                    <ClaimCard key={index} claim={claim} />
                ))}
            </div>
        </>
    )
}
