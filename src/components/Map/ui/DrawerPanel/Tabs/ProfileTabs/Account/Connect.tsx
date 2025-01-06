import ConnectButton from "#components/common/connectButton";
import ConnectButtonBlue from "#components/common/ConnectButtonBlue";
import { useQueryContext } from "#src/context/GlobalQueryContext";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Button, Input } from "@nextui-org/react"

export const ConnectTab = () => {
    const { refParam, cidParam } = useQueryContext();
    const { contributions, players, player, claims, assets } = useContributionContext();

    return (<>
        <div className="w-full gap-2 flex flex-col">
        <div className="w-full flex flex-col gap-2 rounded-xl bg-black/50 p-2 text-center">
        <span className="text-xl text-white/30 font-semibold">
                    Please Connect with MetaMask to Begin Your Adventure! 
                </span>
                <span className="text-md text-white mt-2">
                    Unlock the full potential of Millionar Map by connecting your MetaMask wallet. It's quick, secure, and the first step towards your journey to wealth!
                </span>
            </div>
            <ConnectButtonBlue />
        </div>

    </>)

}