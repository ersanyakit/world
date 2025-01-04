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

                    <Card shadow="sm" isHoverable  className='w-full' key={Number(player.index)}>
                        <div className="flex flex-row items-center justify-center gap-2 p-2">
                           
                            <div className="w-full flex flex-col gap-2 items-start justify-center">
                                <div className="w-full flex flex-row gap-2 items-center justify-start">
                                <div className=" bg-success-50 shadow-small border-1 border-success-100 rounded-full p-2">
                                    <Unicon size={24} address={player.wallet} randomSeed={Number(player.index)} />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                <span className='text-sm font-bold'>{player.name ? player.name : "Unknown User"}</span>
                                <span className='text-xs font-sans'>{player.wallet}</span>
                                </div>
                                
                                </div>
                             
                                <div className="w-full grid grid-cols-3 gap-2">

                                    <div className="flex-none border-1 border-default-200/50 rounded-small text-center overflow-hidden">
                                        <div className="text-tiny bg-default-100 py-0.5 text-default-500">
                                            Referrals
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-3xl text-default-500">
                                            {player.referral.length}
                                        </div>
                                    </div>

                                    <div className="flex-none border-1 border-default-200/50 rounded-small text-center overflow-hidden">
                                        <div className="text-tiny bg-default-100 py-0.5 text-default-500">
                                        Followings
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-3xl text-default-500">
                                            {player.followings.length}
                                        </div>
                                    </div>

                                    <div className="flex-none border-1 border-default-200/50 rounded-small text-center overflow-hidden">
                                        <div className="text-tiny bg-default-100 py-0.5 text-default-500">
                                        Followers
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-3xl text-default-500">
                                            {player.followers.length}
                                        </div>
                                    </div>

                                    <div className="flex-none border-1 border-default-200/50 rounded-small text-center overflow-hidden">
                                        <div className="text-tiny bg-default-100 py-0.5 text-default-500">
                                        Pins
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-3xl text-default-500">
                                            {player.followers.length}
                                        </div>
                                    </div>

                                    <div className="flex-none border-1 border-default-200/50 rounded-small text-center overflow-hidden">
                                        <div className="text-tiny bg-default-100 py-0.5 text-default-500">
                                        Claims
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-3xl text-default-500">
                                            {player.followers.length}
                                        </div>
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
