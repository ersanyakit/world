import { Unicon } from "#components/Unicon";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Player } from "#src/types/Contribution";
import { Card, Link, User } from "@nextui-org/react";

export const PlayerTAB = () => {

    const { contributions, players, claims, assets } = useContributionContext();


    const PlayerCard = ({ player }: { player: Player })  => {

        return (
            <>
               <Card shadow="sm" className='w-full cursor-pointer border border-1 border-black/50 bg-primary/5 hover:bg-black/30 transition-colors duration-200' key={Number(player.index)}>
                        <div className="flex flex-row items-center justify-center gap-2 p-2">
                           
                            <div className="w-full flex flex-col gap-2 items-start justify-center">
                                <div className="w-full flex flex-row gap-2 items-center justify-start">
                                <div className="animate-spin bg-black/20 shadow-small border-1 border-success-100 rounded-full p-2">
                                    <Unicon size={24} address={player.wallet} randomSeed={Number(player.index)} />
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                <span className='text-sm font-bold text-lime-500'>{player.name ? player.name : "Unknown User"}</span>
                                <span className='text-xs font-sans  text-fuchsia-400'>{player.wallet}</span>
                                </div>
                                
                                </div>
                             
                                <div className="w-full grid grid-cols-3 gap-2">

                                    <div className="flex-none border-1 border-white/5 rounded-small text-center overflow-hidden">
                                        <div className="text-tiny bg-black py-0.5 text-white">
                                            Referrals
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-3xl text-default-500">
                                            {player.referrals.length}
                                        </div>
                                    </div>

                                    <div className="flex-none border-1 border-white/5 rounded-small text-center overflow-hidden">
                                        <div className="text-tiny bg-black py-0.5 text-white">
                                        Followings
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-3xl text-default-500">
                                            {player.followings.length}
                                        </div>
                                    </div>

                                    <div className="flex-none border-1 border-white/5 rounded-small text-center overflow-hidden">
                                        <div className="text-tiny bg-black py-0.5 text-white">
                                        Followers
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-3xl text-default-500">
                                            {player.followers.length}
                                        </div>
                                    </div>

                                    <div className="flex-none border-1 border-white/5 rounded-small text-center overflow-hidden">
                                        <div className="text-tiny bg-black py-0.5 text-white">
                                        Pins
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-3xl text-default-500">
                                            {player.contributions.length}
                                        </div>
                                    </div>

                                    <div className="flex-none border-1 border-white/5 rounded-small text-center overflow-hidden">
                                        <div className="text-tiny bg-black py-0.5 text-white">
                                        Claims
                                        </div>
                                        <div className="flex items-center justify-center font-semibold text-3xl text-default-500">
                                            {player.claims.length}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Card>
            </>
        )
    }
    return (
        <>
  
            <div className='w-full flex flex-col gap-2 py-2'>
                {players.slice().reverse().map((player, index) => (
                    <PlayerCard key={index} player={player}/>
                ))}
            </div>
        </>
    )
}
