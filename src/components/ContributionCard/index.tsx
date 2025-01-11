import { Button, Card, CardBody, Link, Tooltip } from '@nextui-org/react';
import {  useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { FormatAddressDesign, generateTweetIntentURL, getTokenByAddress, TimestampDetails, unixToTimestampDetails } from '#src/utils/helpers';
import React, { useEffect, useState } from 'react';
import { Unicon } from '#components/Unicon';
import { ExternalLink, Globe, Twitter } from 'lucide-react';
import { useContributionContext } from '#src/context/GlobalStateContext';
import { Contribution } from '#src/types/Contribution';
import { formatUnits } from 'ethers';
import { Token } from '#src/types/web3.types';


const ContributionCard = ({ contribution }: { contribution: Contribution }) => {
    const [dateTimeDetails,setDateTimeDetails] = useState<TimestampDetails | null>(unixToTimestampDetails(contribution.timestamp))
    const [tokenInfo,setTokenInfo] = useState<Token | null>(getTokenByAddress(contribution.token))
    const { address, isConnected } = useAppKitAccount();

    return(<>
       <Card shadow="sm"  className='w-full cursor-pointer border border-1 border-black/50 bg-primary/5 hover:bg-black/50 transition-colors duration-200' key={Number(contribution.index)}>
                    <CardBody>
                        <div className="flex flex-col gap-2">

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
                                        <svg
                                            className="text-red-500"
                                            height="20"
                                            viewBox="0 0 16 16"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g
                                                fill="none"
                                                fillRule="evenodd"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                            >
                                                <path d="M2 6.854C2 11.02 7.04 15 8 15s6-3.98 6-8.146C14 3.621 11.314 1 8 1S2 3.62 2 6.854" />
                                                <path d="M9.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="w-full flex flex-col gap-0.5">
                                        
                                        <Link
                                            isExternal
                                            showAnchorIcon
                                            anchorIcon={
                                                <svg
                                                    className="group-hover:text-inherit text-default-400 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                    fill="none"
                                                    height="16"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    width="16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M7 17 17 7M7 7h10v10" />
                                                </svg>
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
                                        <Button className="text-white" target="_blank" href={generateTweetIntentURL(contribution.contributor,contribution.index)} as={Link} variant="shadow" color="success" fullWidth startContent={
                                            <Twitter />
                                        } endContent={
                                            <ExternalLink />
                                        }
                                        >
                                            <span className="w-full">
                                        Tweet and Earn a 30% Referral Fee
                                        </span>
                                        </Button>
                                        </Tooltip>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>

                    </CardBody>


                </Card>
    </>)
}

export default ContributionCard;
