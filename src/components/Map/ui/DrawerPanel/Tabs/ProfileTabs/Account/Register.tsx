import { Unicon } from "#components/Unicon";
import { useQueryContext } from "#src/context/GlobalQueryContext";
import { useContributionContext } from "#src/context/GlobalStateContext";
import useInitContributors from "#src/hooks/useInitContributors";
import { ContractCallResponse } from "#src/types/web3.types";
import { register } from "#src/utils/web3/util";
import { Button, Input } from "@nextui-org/react"
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { ethers } from "ethers";
import { useState } from "react";

export const RegisterTAB = () => {
    const { refParam, cidParam } = useQueryContext();
    const { contributions, players, player, claims, assets ,registrationFee} = useContributionContext();
    const [ref, setRef] = useState<string>(refParam ? ethers.isAddress(refParam) ? refParam : "" : "")
 const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const [isLoading,setLoading] = useState<boolean>(false)
  const [refreshTrigger, setRefreshTrigger] = useState(true);
  useInitContributors(refreshTrigger);

    const handleRegister = async() => {
        setLoading(true)
        const registerResponse : ContractCallResponse= await register(walletProvider,isConnected,ref,registrationFee);
        console.log(registerResponse)
        setLoading(false)
        if(registerResponse.success){
            setRefreshTrigger(!refreshTrigger)
        }
        
    }

    return (<>
        <div className="w-full gap-2 flex flex-col">
            <div className="w-full rounded-xl bg-black/30 p-4 text-white text-center flex flex-col gap-2">
                <span className="text-xl text-lime-500 font-semibold">
                    Unlock Your Fortune Today.
                </span>
                <span className="text-lg text-green-600"> Register Now and Start Exploring Millionar Map!</span>
                <span className="text-sm text-green-600 mt-2">
                    Millions of dollars are waiting for you on the map—turn your dream of wealth into reality and begin your adventure today!
                </span>
            </div>
            <Input
            startContent={
                <Unicon address={ref ? ref : ethers.ZeroAddress} size={20} randomSeed={32}/>
            }
                variant="flat"
                className="dark"
                size="lg"
                isClearable
                label="Referral Address"
                placeholder="Enter your referral address"
                name="referral"
                value={ref} onValueChange={setRef}
                fullWidth
            />

            <Button isLoading={isLoading} variant="solid" onPress={()=>{
                handleRegister()
            }} size="lg" color="primary">Register</Button>

        </div>

    </>)

}