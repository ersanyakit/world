import { useContributionContext } from "#src/context/GlobalStateContext";
import { Card } from "@nextui-org/react";

export const PlayerTAB = () => {

    const { contributions, players, claims, assets } = useContributionContext();

    return (
        <>
            <div className="w-full  border-b">
                <h1 className="text-lg">Players</h1>
            </div>
            <div className='w-full flex flex-col gap-2 p-2'>
                {players.slice().reverse().map((player, index) => (
                    <Card className='w-full' key={Number(player.index)}>
                        <div className="flex flex-col gap-2 p-2">
                            <span className='text-xs'>{player.wallet}</span>
                            <span className='text-xs'>{player.wallet}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}
