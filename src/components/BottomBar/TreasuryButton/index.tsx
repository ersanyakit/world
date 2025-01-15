import { ContractCallResponse, Token } from '#src/types/web3.types'
import { Avatar, Button, form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Slider, useDisclosure, useDraggable, User } from '@nextui-org/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useMapContext from '../../Map/useMapContext'
import L from 'leaflet'
import { useAppKitAccount, useAppKitProvider, useAppKit, useAppKitNetwork } from '@reown/appkit/react'
import { Contribution, ContributionInfo } from '#src/types/Contribution'
import { ethers, formatEther, formatUnits, parseEther, parseUnits } from 'ethers'
import LatLngLogo from '#components/TopBar/LatLngLogo'
import { forceFormatUnits, generateHexColorFromAddress, generateShareURL, getTokenByAddress, getTokenDecimalsByAddress, getTokenLogoByAddressAndChainID } from '#src/utils/helpers'
import Leaflet from 'leaflet'
import Geohash from 'ngeohash';
import useInitContributors from '#src/hooks/useInitContributors'
import { TWEET_HEAD, TWEETS } from '#src/constants/constants'
import { Tokens } from '#src/constants/tokens'
import { useContributionContext } from '#src/context/GlobalStateContext'
import { useChainId } from '#src/context/ChainIdProvider'

export interface ChipProps {
    token: Token
}



// TokenChip component
const TreasuryButton = () => {
    // Access map context
    const { map } = useMapContext()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const targetRef = useRef(null);
    const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');
    const [contributionInfo, setContributionInfo] = useState<ContributionInfo | null>(null);
    const [token, setToken] = useState<Token | null>(null)
    const [error, setError] = useState<any>(null)
    const [isLoading, setLoaded] = useState<boolean>(false)



    const [title, setTitle] = useState(TWEET_HEAD[Math.floor(Math.random() * TWEET_HEAD.length)]);
    const [description, setDescription] = useState(TWEETS[Math.floor(Math.random() * TWEETS.length)])
    const [url, setURL] = useState(generateShareURL(address, undefined));
    const [depositAmount, setDepositAmount] = useState<number>(0);


    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const { location, contributions, players, claims, assets, addLocation } = useContributionContext();


   const chainId = useChainId()


    useInitContributors(chainId,refreshTrigger);


    const handleClick = async () => {
        onOpen()
    }

    return (

        <>




            <Modal scrollBehavior='inside' className='bg-black/30' size='lg' backdrop='blur' ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader {...moveProps} className="flex flex-col gap-1 items-start justify-center">
                                <User name={`Treasury`}
                                    classNames={{ base: "text-lime-500" }}
                                    description={"View and manage the hidden wealth embedded within the map."}
                                    avatarProps={{
                                        className: "w-16 h-16 bg-transparent",
                                        src: "/assets/inventory.png"
                                    }} />
                            </ModalHeader>
                            <ModalBody>
                                <ScrollShadow hideScrollBar={true} className='h-[400px]'>


                                    <div className='w-full h-full flex flex-col gap-2 rounded-lg'>
                                        {assets.map((asset, index) => (
                                            <div className='w-full flex flex-row gap-2 items-center justify-center p-2'>
                                                <Avatar
                                                    className="w-10 h-10 group bg-transparent transition-transform duration-300 ease-in-out transform group-hover:scale-90"
                                                    size="lg"
                                                    src={getTokenLogoByAddressAndChainID(asset.token, Number(chainId))}
                                                />

                                                <div className='w-full grid grid-cols-2 gap-2'>

                                                    <div className="flex-none border-1 border-white/5 rounded-small text-center overflow-hidden">
                                                        <div className="text-tiny bg-black py-0.5 text-white">
                                                            Total Deposit
                                                        </div>
                                                        <div className="flex items-center justify-center font-semibold text-sm text-lime-500">
                                                            {parseFloat(formatUnits(asset.deposit, getTokenDecimalsByAddress(asset.token))).toFixed(4)}
                                                        </div>
                                                    </div>

                                                    <div className="flex-none border-1 border-white/5 rounded-small text-center overflow-hidden">
                                                        <div className="text-tiny bg-black py-0.5 text-white">
                                                            Total Withdraw
                                                        </div>
                                                        <div className="flex items-start justify-center font-semibold text-sm text-lime-500">
                                                            {parseFloat(formatUnits(asset.withdraw, getTokenDecimalsByAddress(asset.token))).toFixed(4)}

                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                        ))}
                                    </div>
                                </ScrollShadow>




                            </ModalBody>
                            <ModalFooter>
                                <div className='w-full grid grid-cols-2 justify-center'>
                                    <div className='w-full flex flex-row items-center justify-start'>
                                        <LatLngLogo />
                                    </div>
                                    <div className='w-full flex flex-row gap-2 justify-end'>

                                        <Button
                                            className='text-white' color="danger" onPress={() => {
                                                onClose()
                                            }}>
                                            Close
                                        </Button>
                                    </div>


                                </div>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <div>

                <Button
                    className="w-full bg-amber-500/30"

                    size="lg"
                    isIconOnly
                    radius="full"
                    style={{ width: '64px', height: '64px' }}
                    onPress={handleClick}
                >
                    <Avatar
                        className="group bg-amber-900/40 hover:bg-amber-900/90 transition-transform   group-hover:scale-90"
                        size="lg"
                        src={"/assets/inventory.png"}
                    />
                </Button>
            </div>

        </>

    )
}

export default TreasuryButton;

