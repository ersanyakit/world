"use client";
import { useMemo } from 'react';
import { Contribution } from "#src/types/Contribution";
import { Image } from "@nextui-org/react";

interface IconProps {
  contribution?: Contribution;
  width?: number; // Boyut özelliği opsiyonel, varsayılan bir değer atanabilir
  height?: number;
}

export const MapIcon = ({ contribution = undefined, width = 24, height = 24 }: IconProps) => {
  // Use useMemo to memoize the icon generation logic
  const iconIndex = useMemo(() => {
    const totalIcons = 33;
    const contributionIndex = Number(contribution?.index);
    return (contributionIndex % totalIcons).toString();
  }, [contribution?.index]); // Only recompute when contribution?.index changes
  
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]">
      <Image
        src={`/assets/icons/${iconIndex}.png`}
        alt="Treasure Box"
        className="rounded-full opacity-1"
        width={width}
        height={height}
      />
    </div>
  );
};