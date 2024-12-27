import { Contribution } from "#src/types/Contribution";
import { Avatar, AvatarIcon, Button } from "@nextui-org/react";
import TreasureBoxIcon from "../../assets/icons/treasurebox.svg";
import { Image } from "@nextui-org/react";

interface IconProps {
    contribution?:Contribution
    width?: number; // Boyut özelliği opsiyonel, varsayılan bir değer atanabilir
    height?:number;
  }

  
  export const MapIcon = ({contribution = undefined, width = 24, height = 24 }: IconProps) => {
    const generateRandomIcon = (contribution?:Contribution) : string => {
        const totalIcons = 33; 
        const contributionIndex = Number(contribution?.index)
        const iconIndex = (contributionIndex % totalIcons)
        return iconIndex.toString();
    }
  
    return (
        <div className="flex flex-col gap-2 items-center justify-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]">
            <Image
    src={`/assets/icons/${generateRandomIcon(contribution)}.png`}
    alt="Treasure Box"
    className={`rounded-full opacity-1`}
    width={width}
    height={height}
  />
        </div>
     
    
      );
}