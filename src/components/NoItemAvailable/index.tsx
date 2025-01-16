import { Avatar,Image } from "@nextui-org/react"

export interface NoItemProps {
    title:string;
  description: string;
  icon:string;
  imageClass?: string;  // Optional, to allow fallback
}

const NoItemAvailable = ({title,icon, description,imageClass = "w-48" }: NoItemProps) => {

    return(
        <>
            <div className="w-full h-full bg-black/50 rounded-xl flex flex-col text-center justify-center items-center gap-2 p-2">
            <Image className={imageClass} src={icon} />
            <span className="text-lime-500 text-lg font-bold">{title}</span>
                <span className="text-purple-400 text-sm font-bold">{description}</span>
            </div>
        </>
    )
}

export default NoItemAvailable