import { useQueryContext } from "#src/context/GlobalQueryContext";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Button, Input, Tab, Tabs } from "@nextui-org/react"
import { RegisterTAB } from "./ProfileTabs/Account/Register";
import { AccountTAB } from "./ProfileTabs/Account/Account";
import ConnectButton from "#components/common/connectButton";
import { useAppKitAccount } from "@reown/appkit/react";
import { ConnectTab } from "./ProfileTabs/Account/Connect";

export const ProfileTAB = () => {
    const { refParam, cidParam } = useQueryContext();
    const { address, isConnected } = useAppKitAccount();

    const { contributions, players, player, claims, assets } = useContributionContext();

    return (
        <div className="flex flex-col gap-2">
            <div className="w-full  border-b border-black/50 text-white">
                <h1 className="text-2xl">Profile</h1>
            </div>
            <div className="w-full">
                <Tabs aria-label="Tabs colors" variant="light" fullWidth color={"primary"}>
                    <Tab key="account" title="Account">
                        {
                            
                            isConnected && player ? (
                                player.registered ? (
                                    <AccountTAB />
                                ) : (
                                    <RegisterTAB />
                                )
                            ) : <ConnectTab />
                        }
                    </Tab>
                    <Tab key="referrals" title="Referrals">

                    </Tab>
                    <Tab key="followers" title="Followers">

                    </Tab>
                    <Tab key="followings" title="Followings">

                    </Tab>

                </Tabs>
            </div>
        </div>
    )
}
