import { Button } from '@nextui-org/react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { FormatAddressDesign } from '#src/utils/helpers';
import React from 'react';
import { Unicon } from '#components/Unicon';

const ConnectButton = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  return (
    <>
      <Button
        size="lg"
        aria-label="connect-btn"
        radius="sm"
        variant="light"
        style={{
          transition: 'all 0.3s ease',
        }}
        onPress={() => open()}
      >
    
    {
  isConnected && address && (
    <div className='w-full flex flex-row gap-2 items-center justify-center'>
      <Unicon address={address} size={32} randomSeed={32} />
      <span>{FormatAddressDesign(address)}</span>
    </div>
  )
}

    
{
  !isConnected && (
    <div className='w-full flex flex-row gap-2 items-center justify-center'>
      <span className='font-bold'>Connect</span>
    </div>
  )
}
      </Button>
    </>
  );
};

export default ConnectButton;
