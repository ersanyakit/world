import { Avatar,Image } from "@nextui-org/react"

export interface NoItemProps {
    title:string;
  description: string;
  icon:string;
}

const NoItemAvailable = ({title,icon, description }: NoItemProps) => {

    return(
        <>
            <div className="w-full flex flex-col text-center justify-center items-center gap-2 p-2">
                <Image className="w-48" src={icon}/>
                <span className="text-lime-500 text-lg font-bold">{title}</span>
                <span className="text-purple-400 text-sm font-bold">{description}</span>
            </div>
        </>
    )
}

export default NoItemAvailable