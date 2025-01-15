import { Button, Card, CardBody, Link, Tooltip } from '@nextui-org/react';
import {  useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { FormatAddressDesign, generateTweetIntentByContribution, generateTweetIntentURL, getTokenByAddress, TimestampDetails, unixToTimestampDetails } from '#src/utils/helpers';
import React, { useEffect, useState } from 'react';
import { Unicon } from '#components/Unicon';
import { ExternalLink, Globe, Bird, Navigation, ArrowUpRight, MapPin } from 'lucide-react';
import { useContributionContext } from '#src/context/GlobalStateContext';
import { Contribution } from '#src/types/Contribution';
import { formatUnits } from 'ethers';
import { Token } from '#src/types/web3.types';
import { useChainId } from '#src/context/ChainIdProvider';
import useMapContext from '#components/Map/useMapContext';
import { decodeGeoHash } from '#lib/helper/geocoder';
import { LatLngExpression } from 'leaflet';


const ContributionCard = ({ contribution }: { contribution: Contribution }) => {
    const [dateTimeDetails,setDateTimeDetails] = useState<TimestampDetails | null>(unixToTimestampDetails(contribution.timestamp))
      const chainId = useChainId()
      const { map } = useMapContext()
    
    const [tokenInfo,setTokenInfo] = useState<Token | null>(getTokenByAddress(chainId, contribution.token))

    const handleFly = async () => {
        let markerPosition : LatLngExpression = decodeGeoHash(contribution.geohash)
        if (map) {
            map.setView(markerPosition, map.getZoom(), { animate: false });
        }
    }

    return(
       <Card shadow="sm"  className='w-full cursor-pointer border border-1 border-black/50 bg-primary/5 hover:bg-black/50 transition-colors duration-200' key={Number(contribution.index)}>
                    <CardBody>
                    <div className="flex flex-col gap-2">
                                <div className="flex gap-3 items-center">
                                    <div className="flex-none border-1 border-white/5  rounded-small text-center w-11 overflow-hidden">
                                        <div className="text-tiny bg-black py-0.5 text-white">
                                            {dateTimeDetails?.month}
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-medium h-6 text-default-500">
                                            {dateTimeDetails?.dayNumber}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div className="flex flex-row gap-2 items-center justify-center">
                                        <p className="text-medium text-lime-500 font-medium">
                                           {dateTimeDetails?.date}
                                        </p>
                                        <p className="text-small text-lime-600">
                                            {dateTimeDetails?.hour}
                                        </p>
                                        </div>
                                        <div className="w-full text-white">
                                            <span>{formatUnits(contribution.deposit, tokenInfo ? tokenInfo.decimals : 18)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3 items-start">
                                    <div className="flex items-center justify-center flex-none border-1 border-white/5 rounded-small w-11 min-w-11 h-11">
                                    <MapPin className='text-danger-500' />
                                    </div>
                                    <div className="w-full flex flex-col gap-0.5">
                                        
                                        <Link
                                            isExternal
                                            showAnchorIcon
                                            anchorIcon={
                                                <ArrowUpRight />
                                            }
                                            className="group gap-x-0.5 text-medium text-lime-500 font-medium"
                                            href={contribution.url}
                                            rel="noreferrer noopener"
                                        >
                                        {contribution.name}
                                        </Link>
                                        <div className="w-full">
                                        <p className="text-small text-white">
                                        {contribution.description}
                                        </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-4 gap-3 items-start">
                                    <span className="text-small text-lime-500">
                                        Pinned By
                                    </span>
                                    <div className="flex gap-2 items-center">
                                        
                                    <div className="animate-spin bg-black/20 shadow-small border-1 border-success-100 rounded-full p-2">
                                  
                                        <Unicon size={24} address={contribution.contributor} randomSeed={Number(contribution.index)}/>
                                                  
                                        </div>
                                        <span className="text-xs font-sans text-fuchsia-500">
                                           {contribution.contributor}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col mt-4 gap-2 items-start">
                                    <span className="w-full text-small text-lime-500">
                                        {Number(contribution.claims)} /  {Number(contribution.limit)} Claimed Users
                                    </span>
                                    <div className="flex gap-2 w-full items-center">
                                        <Tooltip placement="right" className="font-sans text-xs" delay={10} color={"primary"}  content={"You will earn a 30% commission from every user who joins through your referral."}>
                                        <Button onPress={()=>{
                                            handleFly()
                                        }} className="text-white" target="_blank" variant="shadow" color="success" fullWidth startContent={
                                            <Bird />
                                        } endContent={
                                            <ExternalLink />
                                        }
                                        >
                                            <span className="w-full">
                                        Find Egg & Claim
                                        </span>
                                        </Button>
                                        </Tooltip>
                                      
                                    </div>
                                </div>
                            </div>

                    </CardBody>


                </Card>
    )
}

export default ContributionCard;
