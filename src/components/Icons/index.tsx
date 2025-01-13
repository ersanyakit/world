import { FunctionComponent } from 'react';
import { Contribution, Player } from '#src/types/Contribution';
import {Image} from "@nextui-org/image";
import { ethers } from 'ethers';
import { getAvatar } from '#src/utils/helpers';
import { generateLogo } from '#lib/helper/geocoder';
import { isContribution } from '#lib/utils';

interface IconProps {
  player?: Player | null;
  contribution?: Contribution | Player | null;
  width?: number;
  height?: number;
}

// MapIcon FunctionComponent olarak tanımlandı
export const MapIcon: FunctionComponent<IconProps> = ({
  contribution,
  player,
  width = 24,
  height = 24,
}) => {
  // Contribution index değerine göre bir ikon indexi hesaplar
  const calculateIconIndex = (): string => {
    const totalIcons = 33;
    const contributionIndex = Number(contribution?.index || 0);
    return (contributionIndex % totalIcons).toString();
  };

  // Verilen adres için token logosunu döndürür
  const getTokenLogoByAddress = (address: string): string => {
    return generateLogo(0, address);
  };

  // İkon URL'sini belirler
  const determineIconUrl = (): string => {
    if (contribution) {

      let checkIsContribution : boolean = isContribution(contribution);
      
      if (!checkIsContribution) {
        return  getAvatar((contribution as Player).wallet);
      }
      if (player && ethers.isAddress(player.wallet)) {
        const normalizedAddress = ethers.getAddress(player.wallet);
        const isClaimer = (contribution as Contribution).claimers.some(
          (claimer) => ethers.getAddress(claimer) === normalizedAddress
        );
        const isContributor =
          normalizedAddress === ethers.getAddress((contribution as Contribution).contributor);
        if (isClaimer || isContributor) {
          return getTokenLogoByAddress((contribution as Contribution).token);
        }
      }
    }
    return `/assets/icons/${calculateIconIndex()}.png`;
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]">
      <img
        src={determineIconUrl()}
        alt="Map Icon"
        className={(isContribution(contribution) ? " " : " perspective-image  ") + " rounded-full opacity-1 w-[60px] h-[80px]"}
      />
    </div>
  );
};