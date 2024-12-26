import TreasureBoxIcon from "../../assets/icons/treasurebox.svg";
import Image from 'next/image';


interface IconProps {
    width?: number; // Boyut özelliği opsiyonel, varsayılan bir değer atanabilir
    height?:number;
  }

  
  export const IconTreasureBox = ({ width = 24, height = 24 }: IconProps) => {
    return (
        <Image
          src={TreasureBoxIcon}
          alt="Treasure Box"
          width={width}
          height={height}
          unoptimized // SVG dosyasını optimize etmeden kullanır
        />
      );
}