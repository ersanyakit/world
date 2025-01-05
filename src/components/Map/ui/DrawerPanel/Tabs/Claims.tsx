import { useContributionContext } from "#src/context/GlobalStateContext";
import { Claim } from "#src/types/Contribution"

export const ClaimTAB = () => {
    const { contributions, players, claims, assets } = useContributionContext();

    const ClaimCard = ({ claim }: { claim: Claim })  => {


        return(
        <>
        </>
        )
    }


    return (
        <>
  
            <div className='w-full flex flex-col gap-2 py-2'>
                {claims.slice().reverse().map((claim, index) => (
                    <ClaimCard key={index} claim={claim}/>
                ))}
            </div>
        </>
    )
}
