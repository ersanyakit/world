"use client";
import { useMemo } from 'react';
import { Contribution } from "#src/types/Contribution";
import { Image } from "@nextui-org/react";
import { useAppKitAccount } from '@reown/appkit/react';
import { ethers } from 'ethers';

interface IconProps {
  contribution?: Contribution;
  width?: number; // Boyut özelliği opsiyonel, varsayılan bir değer atanabilir
  height?: number;
}

export const MapIcon = ({ contribution = undefined, width = 24, height = 24 }: IconProps) => {
    const { address, isConnected } = useAppKitAccount();
  
  // Use useMemo to memoize the icon generation logic
  const iconIndex = useMemo(() => {
    const totalIcons = 33;
    const contributionIndex = Number(contribution?.index);
    return (contributionIndex % totalIcons).toString();
  }, [contribution?.index]); // Only recompute when contribution?.index changes
  

  const getTokenLogoByAddress = (address:string) : string => {
    return `https://raw.githubusercontent.com/kewlexchange/assets/main/chiliz/tokens/${address.toLowerCase()}/logo.svg`
  }
  const getIcon : string = useMemo(() => {
    if(contribution){
      if(ethers.isAddress(address)){
        const normalizedAddress = ethers.getAddress(address);
        let isClaimer = contribution.claimers.some((claimer) => ethers.getAddress(claimer) === normalizedAddress);
        let isContributor = normalizedAddress == ethers.getAddress(contribution?.contributor)
        if(isClaimer || isContributor){
            return getTokenLogoByAddress(contribution.token);
        }
      }
    }
    return `/assets/icons/${iconIndex}.png`;
  }, [contribution?.index]); // Only recompute when contribution?.index changes

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]">
      <Image
        src={getIcon}
        alt={'Eggs'}
        className="rounded-full opacity-1"
        width={width}
        height={height}
      />
    </div>
  );
};