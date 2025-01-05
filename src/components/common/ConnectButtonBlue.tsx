import { Button } from '@nextui-org/react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { FormatAddressDesign } from '#src/utils/helpers';
import React, { useEffect } from 'react';
import { Unicon } from '#components/Unicon';
import { Globe } from 'lucide-react';

const ConnectButtonBlue = () => {
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();

    useEffect(() => {

    }, [address])

    return (
        <Button
            size="lg"
            aria-label="connect-btn"
            radius="lg"
            className='px-2 '
            variant="solid"
            color="primary"
            startContent={
                isConnected ?
                    <div className='animate-spin'><Unicon address={address || ""} size={32} randomSeed={32} /></div>
                    : <div className='animate-spin'>
                        <Globe size={32} color='white' />
                    </div>
            }

            onPress={() => open()}>
            {
                !isConnected && (
                    <div className='w-full flex flex-row gap-2 items-center justify-center'>
                        <span className='font-bold text-white'>Connect</span>
                    </div>
                )
            }
        </Button>
    );
};

export default ConnectButtonBlue;
