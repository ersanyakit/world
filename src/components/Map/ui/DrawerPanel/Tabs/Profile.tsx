import { useQueryContext } from "#src/context/GlobalQueryContext";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Button, Card, Input, Tab, Tabs } from "@nextui-org/react"
import { RegisterTAB } from "./ProfileTabs/Account/Register";
import { AccountTAB } from "./ProfileTabs/Account/Account";
import ConnectButton from "#components/common/connectButton";
import { useAppKitAccount } from "@reown/appkit/react";
import { ConnectTab } from "./ProfileTabs/Account/Connect";
import { Unicon } from "#components/Unicon";

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
                        {player?.referrals.slice().reverse().map((referral, index) => (
                            <ReferralCard key={index} referral={referral} />
                        ))}
                    </Tab>
                    <Tab key="followers" title="Followers">
                    {player?.followers.slice().reverse().map((followers, index) => (
                            <ReferralCard key={index} referral={followers} />
                        ))}
                    </Tab>
                    <Tab key="followings" title="Followings">
                    {player?.followings.slice().reverse().map((followings, index) => (
                            <ReferralCard key={index} referral={followings} />
                        ))}
                    </Tab>

                </Tabs>
            </div>
        </div>
    )
}
