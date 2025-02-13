import { Unicon } from "#components/Unicon";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Player } from "#src/types/Contribution";
import { Card, Link, User } from "@nextui-org/react";

export const PlayerTAB = () => {

    const { contributions, players, claims, assets } = useContributionContext();


    const PlayerCard = ({ player }: { player: Player }) => {
        const stats = [
            { label: 'Referrals', value: player.referrals.length },
            { label: 'Followings', value: player.followings.length },
            { label: 'Followers', value: player.followers.length },
            { label: 'Tasks', value: player.contributions.length },
            { label: 'Claims', value: player.claims.length },
        ];

        const getLabelPosition = (index: number, total: number) => {
            const angle = (360 / total) * index;
            const delay = (index / total) * -20; // Her label için farklı başlangıç pozisyonu
            
            return {
                animationDelay: `${delay}s`,
            } as const;
        };

        const mainCardStyles = {
            bg: "from-zinc-950/90 to-zinc-800/90",
            hover: "hover:from-zinc-900/90 hover:to-zinc-700/90",
            border: "border-zinc-500/20",
            hoverBorder: "group-hover:border-zinc-500/30",
            glow: "drop-shadow-[0_0_3px_rgba(161,161,170,0.2)]"
        };

        type CardStyleKey = 'referrals' | 'followings' | 'followers' | 'tasks' | 'claims' | 'default';

        return (
            <Card
                shadow="sm"
                className={`group w-full transform transition-all duration-300
                    border ${mainCardStyles.border} hover:${mainCardStyles.hoverBorder}
                    bg-gradient-to-br ${mainCardStyles.bg} ${mainCardStyles.hover}
                    rounded-xl overflow-hidden backdrop-blur-sm ${mainCardStyles.glow}
                    hover:scale-[1.01]`}
                key={Number(player.index)}
            >
                <div className="p-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-r from-success-500 to-primary-500 rounded-full animate-pulse opacity-50" />
                                <div className="absolute inset-0 bg-black/30 rounded-full backdrop-blur-sm" />
                                <Unicon
                                    size={32}
                                    address={player.wallet}
                                    randomSeed={Number(player.index)}
                                />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-bold bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent truncate">
                                    {player.name || "Millionaire"}
                                </h3>
                                <p className="text-xs font-mono text-fuchsia-300/90 truncate hover:text-fuchsia-200 transition-colors">
                                    {player.wallet}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-1.5">
                            {stats.map((stat, index) => {
                                const defaultStyle = {
                                    bg: "from-gray-950/90 to-gray-800/90",
                                    hover: "hover:from-gray-900/90 hover:to-gray-700/90",
                                    border: "border-gray-500/20",
                                    hoverBorder: "group-hover:border-gray-500/30",
                                    glow: "drop-shadow-[0_0_3px_rgba(107,114,128,0.2)]"
                                };

                                const cardStyles = {
                                    referrals: {
                                        bg: "from-purple-950/90 to-purple-800/90",
                                        hover: "hover:from-purple-900/90 hover:to-purple-700/90",
                                        border: "border-purple-500/20",
                                        hoverBorder: "group-hover:border-purple-500/30",
                                        glow: "drop-shadow-[0_0_3px_rgba(168,85,247,0.2)]"
                                    },
                                    followings: {
                                        bg: "from-blue-950/90 to-blue-800/90",
                                        hover: "hover:from-blue-900/90 hover:to-blue-700/90",
                                        border: "border-blue-500/20",
                                        hoverBorder: "group-hover:border-blue-500/30",
                                        glow: "drop-shadow-[0_0_3px_rgba(59,130,246,0.2)]"
                                    },
                                    followers: {
                                        bg: "from-emerald-950/90 to-emerald-800/90",
                                        hover: "hover:from-emerald-900/90 hover:to-emerald-700/90",
                                        border: "border-emerald-500/20",
                                        hoverBorder: "group-hover:border-emerald-500/30",
                                        glow: "drop-shadow-[0_0_3px_rgba(16,185,129,0.2)]"
                                    },
                                    tasks: {
                                        bg: "from-amber-950/90 to-amber-800/90",
                                        hover: "hover:from-amber-900/90 hover:to-amber-700/90",
                                        border: "border-amber-500/20",
                                        hoverBorder: "group-hover:border-amber-500/30",
                                        glow: "drop-shadow-[0_0_3px_rgba(245,158,11,0.2)]"
                                    },
                                    claims: {
                                        bg: "from-rose-950/90 to-rose-800/90",
                                        hover: "hover:from-rose-900/90 hover:to-rose-700/90",
                                        border: "border-rose-500/20",
                                        hoverBorder: "group-hover:border-rose-500/30",
                                        glow: "drop-shadow-[0_0_3px_rgba(244,63,94,0.2)]"
                                    },
                                    default: defaultStyle
                                }[stat.label.toLowerCase() as CardStyleKey] || defaultStyle;

                                return (
                                    <div
                                        key={stat.label}
                                        className="group relative flex-1 min-w-[70px]"
                                    >
                                        <div className={`aspect-square w-full rounded-lg 
                                            bg-gradient-to-br ${cardStyles.bg}
                                            ${cardStyles.hover}
                                            transition-all duration-300
                                            border ${cardStyles.border}
                                            relative flex flex-col items-center justify-center
                                            p-1 ${cardStyles.glow}`}
                                        >
                                            {/* İç border */}
                                            <div className={`absolute inset-[4px] border ${cardStyles.border} ${cardStyles.hoverBorder} 
                                                rounded-md transition-colors`} />
                                            
                                            {/* Değer */}
                                            <span className="relative text-lg font-bold text-white/90 
                                                group-hover:text-white group-hover:scale-110 
                                                transition-all duration-200
                                                drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]"
                                            >
                                                {stat.value}
                                            </span>

                                            {/* Label */}
                                            <span className="relative text-[8px] font-medium text-white/70 
                                                group-hover:text-white/90 transition-colors
                                                tracking-wide uppercase mt-0.5
                                                drop-shadow-[0_0_1px_rgba(0,0,0,0.5)]
                                                leading-none"
                                            >
                                                {stat.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
    return (
        <>

            <div className='w-full flex flex-col gap-2'>
                {players.slice().reverse().map((player, index) => (
                    <PlayerCard key={`player${index}`} player={player} />
                ))}
            </div>
        </>
    )
}
