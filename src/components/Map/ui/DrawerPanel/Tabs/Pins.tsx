import ContributionCard from "#components/ContributionCard";
import { Unicon } from "#components/Unicon";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { useMemo } from "react";


export const PinTAB = () => {

    const { contributions, players, claims, assets } = useContributionContext();

    const reversedContributions = useMemo(() => contributions.slice().reverse(), [contributions]);

 
    return (
        <>
    
            <div className="flex flex-col w-full justify-center items-center pt-4 gap-2">


                {reversedContributions.map((contribution, index) => (
                    <ContributionCard key={index} contribution={contribution}/>
                 
                ))}




            </div>
        </>
    )
}
