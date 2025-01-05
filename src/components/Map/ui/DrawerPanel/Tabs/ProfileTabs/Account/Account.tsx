import { useQueryContext } from "#src/context/GlobalQueryContext";
import { useContributionContext } from "#src/context/GlobalStateContext";
import { Button, Input } from "@nextui-org/react"

export const AccountTAB = () => {
    const { refParam, cidParam } = useQueryContext();
    const { contributions, players,player, claims, assets } = useContributionContext();

return(<>
<div className="w-full gap-2 flex flex-col">


<Input
    classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
            "shadow-sm",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
        ],
    }}
    variant="flat"
    size="lg"
    isClearable
    label="Name"
    placeholder="Enter your name or nickname"
    name="wallet"
    fullWidth
/>

<Input
    classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
            "shadow-sm",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
        ],
    }}
    variant="flat"
    size="lg"
    isClearable
    label="Bio"
    placeholder="Enter your bio"
    name="bio"
    fullWidth
/>

<Input
    classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
            "shadow-sm",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
        ],
    }}
    variant="flat"
    size="lg"
    isClearable
    label="Twitter Address"
    placeholder="Enter your Twitter username"
    name="twitter"
    fullWidth
/>
<Input
    classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
            "shadow-sm",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
        ],
    }}
    variant="flat"
    size="lg"
    isClearable
    label="Telegram Address"
    placeholder="Enter your telegram username"
    name="telegram"
    fullWidth
/>

<Input
    
    classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
            "shadow-sm",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
        ],
    }}

    variant="flat"
    size="lg"
    isClearable
    label="Referral Address"
    placeholder="Enter your referral address"
    name="referral"
    fullWidth
/>

<span>{refParam}</span>


{
player ? (
player.registered ? (
<Button size="lg" color="primary">
Update
</Button>
) : (
<Button size="lg" color="primary">
Register
</Button>
)
) : null
}


</div>

</>)

}