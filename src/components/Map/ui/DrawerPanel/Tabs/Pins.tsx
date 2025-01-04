import { Unicon } from "#components/Unicon";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Card, CardBody, Avatar, AvatarGroup, Link, Tooltip, AvatarIcon } from "@nextui-org/react"

export const PinTAB = () => {

    const { contributions, players, claims, assets } = useContributionContext();

    return (
        <>
            <div className="w-full  border-b">
                <h1 className="text-2xl">Pins</h1>
            </div>
            <div className="flex flex-col w-full justify-center items-center pt-4 gap-2">


                {contributions.map((contribution, index) => (
                    <Card className='w-full' key={Number(contribution.index)}>
                        <CardBody>
                            <div className="flex flex-col gap-2">

                                <div className="mt-4 flex flex-col gap-3">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex-none border-1 border-default-200/50 rounded-small text-center w-11 overflow-hidden">
                                            <div className="text-tiny bg-default-100 py-0.5 text-default-500">
                                                Nov
                                            </div>
                                            <div className="flex items-center justify-center font-semibold text-medium h-6 text-default-500">
                                                19
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <p className="text-medium text-foreground font-medium">
                                                Tuesday, November 19
                                            </p>
                                            <p className="text-small text-default-500">
                                                5:00 PM - 9:00 PM PST
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <div className="flex items-center justify-center border-1 border-default-200/50 rounded-small w-11 h-11">
                                            <svg
                                                className="text-default-500"
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
                                        <div className="flex flex-col gap-0.5">
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
                                                className="group gap-x-0.5 text-medium text-foreground font-medium"
                                                href="https://www.google.com/maps/place/555+California+St,+San+Francisco,+CA+94103"
                                                rel="noreferrer noopener"
                                            >
                                                555 California St suite 500
                                            </Link>
                                            <p className="text-small text-default-500">
                                                San Francisco, California
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col mt-4 gap-3 items-start">
                                        <span className="text-small text-default-500">
                                            Pinned By
                                        </span>
                                        <div className="flex gap-2 items-center">
                                            
                                            <div className="w-full bg-success-50 shadow-small border-1 border-success-100 rounded-full p-2">
                                      
                                            <Unicon size={24} address={contribution.contributor} randomSeed={Number(contribution.index)}/>
                                                      
                                            </div>
                                            <span className="text-xs font-sans text-default-500">
                                               {contribution.contributor}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-4 gap-3 items-start">
                                        <span className="text-small text-default-500">
                                            {Number(contribution.claims)} /  {Number(contribution.limit)} Claimed Users
                                        </span>
                                        <div className="flex gap-2 items-center">
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </CardBody>


                    </Card>
                ))}




            </div>
        </>
    )
}
