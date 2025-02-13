import { Button, Card, CardBody, Link, Tooltip } from '@nextui-org/react';
import {  useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { FormatAddressDesign, generateTweetIntentByContribution, generateTweetIntentURL, getTokenByAddress, TimestampDetails, unixToTimestampDetails } from '#src/utils/helpers';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Unicon } from '#components/Unicon';
import { ExternalLink, Globe, Bird, Navigation, ArrowUpRight, MapPin } from 'lucide-react';
import { useContributionContext } from '#src/context/GlobalStateContext';
import { Contribution } from '#src/types/Contribution';
import { formatUnits } from 'ethers';
import { Token } from '#src/types/web3.types';
import { useChainId } from '#src/context/ChainIdProvider';
import useMapContext from '#components/Map/useMapContext';
import { decodeGeoHash } from '#lib/helper/geocoder';
import { LatLngExpression } from 'leaflet';
import { toast } from 'sonner';
import { memo } from 'react';

interface ContributionCardProps {
  contribution: Contribution;
  className?: string;
}

const ContributionCard: React.FC<ContributionCardProps> = ({ contribution, className }) => {
  const chainId = useChainId();
  const { map } = useMapContext();
  const { player } = useContributionContext();
  
  const [state, setState] = useState({
    isLoading: false,
    isExpanded: false,
  });

  const dateTimeDetails = useMemo<TimestampDetails>(() => 
    unixToTimestampDetails(contribution.timestamp),
    [contribution.timestamp]
  );

  const tokenInfo = useMemo<Token | null>(() => 
    getTokenByAddress(chainId, contribution.token),
    [chainId, contribution.token]
  );

  const MIN_CONTRIBUTIONS_REQUIRED = 20;
  const ANIMATION_DURATION = 1;

  const formattedDeposit = useMemo(() => 
    formatUnits(contribution.deposit, tokenInfo?.decimals ?? 18),
    [contribution.deposit, tokenInfo]
  );

  const markerPosition = useMemo<LatLngExpression>(() => 
    decodeGeoHash(contribution.geohash),
    [contribution.geohash]
  );

  const handleFly = useCallback(async () => {
    if (!player || !map) return;

    if (player.contributions.length < MIN_CONTRIBUTIONS_REQUIRED) {
      toast.error(`En az ${MIN_CONTRIBUTIONS_REQUIRED} katkı yapmanız gerekiyor.`);
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await map.setView(markerPosition, map.getZoom(), { 
        animate: true,
        duration: ANIMATION_DURATION
      });
    } catch (error) {
      toast.error('Harita konumuna giderken bir hata oluştu.');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [player, map, markerPosition]);

  const toggleExpand = useCallback(() => {
    setState(prev => ({ ...prev, isExpanded: !prev.isExpanded }));
  }, []);

  return (
    <Card
      shadow="lg"
      className={`w-full cursor-pointer border border-success-500/20 bg-black/40 
        hover:bg-black/70 hover:border-success-500/40 transition-all duration-300 
        backdrop-blur-sm hover:scale-[1.02] ${className}`}
      key={Number(contribution.index)}
      isPressable
      onPress={toggleExpand}
    >
      <CardBody className="p-5">
        <div className="flex flex-col gap-4">
          <ContributorInfo 
            contribution={contribution} 
            formattedDeposit={formattedDeposit}
            tokenInfo={tokenInfo}
            dateTimeDetails={dateTimeDetails}
            onFly={handleFly}
            isLoading={state.isLoading}
          />

          {state.isExpanded && (
            <ExpandedContent 
              description={contribution.description}
              claims={Number(contribution.claims)}
              limit={Number(contribution.limit)}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

interface ContributorInfoProps {
  contribution: Contribution;
  formattedDeposit: string;
  tokenInfo: Token | null;
  dateTimeDetails: TimestampDetails;
  onFly: () => Promise<void>;
  isLoading: boolean;
}

const ContributorInfo = memo(({ 
  contribution, 
  formattedDeposit, 
  tokenInfo, 
  dateTimeDetails, 
  onFly, 
  isLoading 
}: ContributorInfoProps) => (
  <div className="flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Unicon 
            size={40}
            address={contribution.contributor} 
            randomSeed={Number(contribution.index)}
          />
        </div>
        <div className="space-y-1">
          <p className="text-success-400 font-semibold text-lg">{contribution.name}</p>
          <p className="text-sm text-white/60 font-medium">
            {FormatAddressDesign(contribution.contributor)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-success-400 font-bold text-lg">
          {formattedDeposit} {tokenInfo?.symbol}
        </p>
        <p className="text-sm text-white/50 font-medium">{dateTimeDetails?.date}</p>
      </div>
    </div>
    <div className="flex justify-between items-center gap-4">
      <ClaimProgress claims={Number(contribution.claims)} limit={Number(contribution.limit)} />
      <Button
        onPress={onFly}
        size="sm"
        color="success"
        variant="flat"
        isLoading={isLoading}
        className="font-medium text-sm px-4 min-w-[130px] h-9"
        startContent={<MapPin className="w-4 h-4" />}
      >
        Haritada Göster
      </Button>
    </div>
  </div>
));

const ClaimProgress = memo(({ claims, limit }: { claims: number; limit: number }) => (
  <div className="flex flex-1 justify-start items-center gap-3">
    <div className="w-32 h-2 bg-success-500/20 rounded-full overflow-hidden">
      <div 
        className="h-full bg-success-500 rounded-full transition-all duration-300"
        style={{ width: `${(claims / limit) * 100}%` }}
      />
    </div>
    <Tooltip content={`${claims} kişi talep etmiş, ${limit} kişi talep edebilir`}>
      <span className="text-white/90 whitespace-nowrap text-sm bg-success-500/20 px-4 py-1.5 rounded-full font-medium hover:bg-success-500/30 transition-colors">
        {claims} / {limit}
      </span>
    </Tooltip>
  </div>
));

interface ExpandedContentProps {
  description: string;
  claims: number;
  limit: number;
}

const ExpandedContent = memo(({ 
  description, 
  claims, 
  limit 
}: ExpandedContentProps) => (
  <div className="space-y-3 mt-2">
    <p className="text-sm text-white/80 leading-relaxed border-l-2 border-success-500/30 pl-4">
      {description}
    </p>
  </div>
));

export default memo(ContributionCard);
