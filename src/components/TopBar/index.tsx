import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  NavbarMenuToggle,
  ModalContent,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  ScrollShadow,
} from '@nextui-org/react';
import ConnectButton from '#components/common/connectButton';
import DrawerPanel from '#components/Map/ui/DrawerPanel';
import LatLngLogo from '#components/TopBar/LatLngLogo';
import { useEffect, useState } from 'react';
import Intro from '#components/Intro';

const MapTopBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  useEffect(()=>{
   // onOpen();
  },[])
  
  return (
    <>
      {/** @ts-ignore */}
      <DrawerPanel
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />


      <Modal backdrop='blur' className='bg-black/50'  scrollBehavior={"inside"} size='lg' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">MILLIONARMAP</ModalHeader>
              <ModalBody>
                <ScrollShadow hideScrollBar>
                <Intro onClose={onClose}/>
                </ScrollShadow>
              
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className=" absolute top-3 text-white w-full z-40 flex items-center justify-center">
        <Navbar
          classNames={{
            wrapper: "rounded-full pr-2",
            base: "rounded-full z-40 flex gap-4 flex-row relative flex-nowrap items-center h-[var(--navbar-height)] max-w-[1024px] px-0 w-full justify-center bg-transparent",
          }
          }

          isBlurred={true} isBordered={true} isMenuOpen={isDrawerOpen} onMenuOpenChange={setIsDrawerOpen}>
          <NavbarMenuToggle
            aria-label={"Open menu"}
          />

          <NavbarBrand>
            <Image width={96} height={96} src="/assets/map.svg" />
            <p className="hidden font-bold text-inherit">MillionarMap</p>

            <a className="twitter-share-button"
   href="https://twitter.com/intent/tweet?text=Check%20out%20this%20view%20from%20Sabanci%20University%21%20https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/SabanciUniversity_DormView.jpg/440px-SabanciUniversity_DormView.jpg"
   target="_blank">
   Tweet
</a>
          </NavbarBrand>


          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                <LatLngLogo />
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            {/** @ts-ignore */}
            <ConnectButton />
          </NavbarContent>
        </Navbar>
      </div>
    </>
  );
};
export default MapTopBar;
