import { Unicon } from "#components/Unicon";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Card, Link, User } from "@nextui-org/react";

export const PlayerTAB = () => {

    const { contributions, players, claims, assets } = useContributionContext();

    return (
        <>
            <div className="w-full  border-b">
                <h1 className="text-2xl">Players</h1>
            </div>
            <div className='w-full flex flex-col gap-2 py-2'>
                {players.slice().reverse().map((player, index) => (
                 
                    <Card shadow="sm" isHoverable isPressable className='w-full' key={Number(player.index)}>
                        <div className="flex flex-row items-center justify-center gap-2 p-2">
                            <div>
                                <div className="w-full bg-success-50 shadow-small border-1 border-success-100 rounded-full p-2">
                                <Unicon size={24} address={player.wallet} randomSeed={Number(player.index)}/>
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-2 items-start justify-center">
                            <span className='text-xs font-sans'>{player.wallet}</span>
                            <div className="w-full grid grid-cols-3">
                                <div className="w-full flex flex-col gap-1">
                                    <span className='text-xs font-sans'>Referrals</span>
                                    <span className='text-xs font-sans'>{player.referral.length}</span>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <span className='text-xs font-sans'>Following</span>
                                    <span className='text-xs font-sans'>{player.followings.length}</span>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <span className='text-xs font-sans'>Followers</span>
                                    <span className='text-xs font-sans'>{player.followers.length}</span>
                                </div>

                            </div>
                            </div>
                           
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}
