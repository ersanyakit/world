import { useQueryContext } from "#src/context/GlobalQueryContext";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Button, Card, Input, ScrollShadow, Tab, Tabs } from "@nextui-org/react"
import { RegisterTAB } from "./ProfileTabs/Account/Register";
import { AccountTAB } from "./ProfileTabs/Account/Account";
import ConnectButton from "#components/common/connectButton";
import { useAppKitAccount } from "@reown/appkit/react";
import { ConnectTab } from "./ProfileTabs/Account/Connect";
import { Unicon } from "#components/Unicon";
import NoItemAvailable from "#components/NoItemAvailable";

export const ProfileTAB = () => {
    const { refParam, cidParam } = useQueryContext();
    const { address, isConnected } = useAppKitAccount();

    const { contributions, players, player, claims, assets } = useContributionContext();



    const ReferralCard = ({ referral }: { referral: string }) => {

        return (
            <>
                <Card shadow="sm" className='w-full cursor-pointer border border-1 border-black/50 bg-primary/5 hover:bg-black/30 transition-colors duration-200' key={Number(referral)}>
                    <div className="flex flex-row items-center justify-center gap-2 p-2">

                        <div className="w-full flex flex-col gap-2 items-start justify-center">
                            <div className="w-full flex flex-row gap-2 items-center justify-start">
                                <div className="animate-spin bg-black/20 shadow-small border-1 border-success-100 rounded-full p-2">
                                    <Unicon size={24} address={referral} randomSeed={Number(referral)} />
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <span className='text-xs font-sans  text-fuchsia-400'>{referral}</span>
                                </div>

                            </div>


                        </div>

                    </div>
                </Card>
            </>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="w-full">
                <Tabs aria-label="Tabs colors" variant="light" fullWidth color={"primary"}>
                    <Tab key="account" title="Account">
                        {
                            isConnected ? (
                                player ? (
                                    player.registered ? (
                                        <AccountTAB />
                                    ) : (
                                        <RegisterTAB />
                                    )
                                ) : (
                                    <RegisterTAB />
                                )
                            ) : (
                                <ConnectTab />
                            )
                        }
                    </Tab>
                    <Tab key="referrals" title="Referrals">
                        <ScrollShadow hideScrollBar>
                            <div className="w-full flex flex-col gap-2">


                                {
                                    player?.referrals.length === 0 ? (
                                        <NoItemAvailable
                                            icon="/assets/referrals.png"
                                            title="No referrals yet."
                                            description="Invite others to join and grow your network. Each referral brings you closer to financial success!"
                                        />
                                    ) : (
                                        player?.referrals.slice().reverse().map((referral, index) => (
                                            <ReferralCard key={index} referral={referral} />
                                        ))
                                    )
                                }


                            </div>
                        </ScrollShadow>
                    </Tab>
                    <Tab key="followers" title="Followers">
                        <ScrollShadow hideScrollBar>
                            <div className="w-full flex flex-col gap-2">
                                {
                                    player?.followers.length === 0 ? (
                                        <NoItemAvailable
                                            icon="/assets/followers.png"
                                            title="You are not following anyone."
                                            description="Follow users to accelerate your journey to becoming a millionaire!"
                                        />
                                    ) : (
                                        player?.followers.slice().reverse().map((follower, index) => (
                                            <ReferralCard key={index} referral={follower} />
                                        ))
                                    )
                                }
                            </div>
                        </ScrollShadow>
                    </Tab>
                    <Tab key="followings" title="Followings">
                        <ScrollShadow hideScrollBar>
                            <div className="w-full flex flex-col gap-2">

                                {
                                    player?.followings.length === 0 ? (
                                        <NoItemAvailable
                                            icon="/assets/following.png"
                                            title="You haven't followed anyone yet."
                                            description="Start following people to expand your network and unlock more opportunities!"
                                        />
                                    ) : (
                                        player?.followings.slice().reverse().map((following, index) => (
                                            <ReferralCard key={index} referral={following} />
                                        ))
                                    )
                                }
                            </div>


                        </ScrollShadow>
                    </Tab>

                </Tabs>
            </div>
        </div>
    )
}
