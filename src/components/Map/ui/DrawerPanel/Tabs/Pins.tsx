import ContributionCard from "#components/ContributionCard";
import { Unicon } from "#components/Unicon";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Contribution } from "#src/types/Contribution";
import { Token } from "#src/types/web3.types";
import { generateShareURL, generateTweetIntentURL, getTokenByAddress, TimestampDetails, unixToTimestampDetails } from "#src/utils/helpers";
import { Card, CardBody, Avatar, AvatarGroup, Link, Tooltip, AvatarIcon, Button } from "@nextui-org/react"
import { useAppKitAccount } from "@reown/appkit/react";
import { formatUnits } from "ethers";
import { ExternalLink, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

export const PinTAB = () => {

    const { contributions, players, claims, assets } = useContributionContext();


 
    return (
        <>
    
            <div className="flex flex-col w-full justify-center items-center pt-4 gap-2">


                {contributions.slice().reverse().map((contribution, index) => (
                    <ContributionCard key={index} contribution={contribution}/>
                 
                ))}




            </div>
        </>
    )
}
