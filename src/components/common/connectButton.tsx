import { Button } from '@nextui-org/react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { FormatAddressDesign } from '#src/utils/helpers';
import React from 'react';

const ConnectButton = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  return (
    <>
      <Button
        size="lg"
        disableRipple
        aria-label="connect-btn"
        radius="sm"
        color="primary"
        style={{
          transition: 'all 0.3s ease',
        }}
        onPress={() => open()}
      >
        {!isConnected ? 'Connect' : address && FormatAddressDesign(address)}
      </Button>
    </>
  );
};

export default ConnectButton;
