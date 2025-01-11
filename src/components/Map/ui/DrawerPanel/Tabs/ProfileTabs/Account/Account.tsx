import { encodeGeoHash } from "#lib/helper/geocoder";
import { useQueryContext } from "#src/context/GlobalQueryContext";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Player } from "#src/types/Contribution";
import { updateProfile } from "#src/utils/web3/util";
import { Button, Input } from "@nextui-org/react"
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { ethers } from "ethers";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

export const AccountTAB = () => {
    const { refParam, cidParam } = useQueryContext();
    const { contributions, players,player, claims, assets,location } = useContributionContext();
    const [isLoading ,setLoaded ] = useState<boolean>(false)
      const { walletProvider } = useAppKitProvider('eip155');
     const { address, isConnected } = useAppKitAccount();
    
    const defaultLocation: LatLngExpression = [40.712776, -74.005974];  // Örneğin, New York
    const positionInfo: LatLngExpression = location ? [location.lat, location.lng] : defaultLocation;



    const [newPlayer, setNewPlayer] = useState<Player>({
        valid: false,
        registered: false,
        index: BigInt(0),
        lastaccess: BigInt(0),
        wallet: "",
        referral: "",
        avatar: "",
        cover: "",
        name: "",
        bio: "",
        twitter: "",
        telegram: "",
        instagram: "",
        youtube: "",
        facebook: "",
        discord: "",
        tiktok: "",
        website: "",
        geohash:encodeGeoHash(positionInfo),
        contributions: [],
        claims: [],
        followers: [],
        followings: [],
        referrals: []
      });


      useEffect(() => {
        setNewPlayer((prevPlayer) => ({
          ...prevPlayer,  // Önceki state'in tüm özelliklerini koruyoruz
          bio: player?.bio || prevPlayer?.bio,  
          valid:player?.valid || prevPlayer?.valid,
          registered:player?.registered || prevPlayer?.registered,
          twitter: player?.twitter || prevPlayer?.twitter,  
          telegram: player?.telegram || prevPlayer?.telegram,  
          name: player?.name || prevPlayer?.name,  
          geohash: player?.geohash || prevPlayer?.geohash,  
          wallet:ethers.ZeroAddress,
          referral:ethers.ZeroAddress,
          referrals:[],
          followers:[],
          followings:[],
          claims:[],
          contributions:[]

        }));
      }, [player]);

const handleUpdateProfile = async () => {
    setLoaded(true)

    const updateInfo = await updateProfile(walletProvider,isConnected,newPlayer)
    console.log("updateInfo",updateInfo,newPlayer,player)
    setLoaded(false)

}

return(<>
<div className="w-full gap-2 flex flex-col">


<Input
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
    value={newPlayer?.name}
    onValueChange={(value)=>{
        setNewPlayer((prevPlayer) => ({
            ...prevPlayer,
            name: value,  // `name`'yu güncelle
          }));
    }}
    variant="flat"
    size="lg"
    isClearable
    label="Name"
    placeholder="Enter your name or nickname"
    name="name"
    fullWidth
/>

<Input
    value={newPlayer?.bio}
    onValueChange={(value)=>{
        setNewPlayer((prevPlayer) => ({
            ...prevPlayer,
            bio: value,  // `bio`'yu güncelle
          }));
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
    }}
    variant="flat"
    size="lg"
    isClearable
    label="Bio"
    placeholder="Enter your bio"
    name="bio"
    fullWidth
/>

<Input
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
    value={newPlayer.twitter}
    onValueChange={(value)=>{
        setNewPlayer((prevPlayer) => ({
            ...prevPlayer,
            twitter: value,  // `twitter`'yu güncelle
          }));
    }}

    variant="flat"
    size="lg"
    isClearable
    label="Twitter [@millionarmap]"
    placeholder="Enter your Twitter username"
    name="twitter"
    fullWidth
/>
<Input
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
    variant="flat"
    size="lg"
    isClearable
    label="Telegram [@millionarmap]"
    placeholder="Enter your telegram username"
    name="telegram"
    value={newPlayer?.telegram}
    onValueChange={(value)=>{
        setNewPlayer((prevPlayer) => ({
            ...prevPlayer,
            telegram: value,  // `twitter`'yu güncelle
          }));

    }}
    fullWidth
/>

<Input
    
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
    isDisabled={true}
    value={player?.referral}
    variant="flat"
    size="lg"
    isClearable
    label="Referral Address"
    placeholder="Enter your referral address"
    name="referral"
    fullWidth
/>



 
<Button isLoading={isLoading} onPress={()=>{
    handleUpdateProfile()
}} size="lg" color="primary">
Update
</Button>
 

</div>

</>)

}