import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import ConnectButton from '#components/common/connectButton';
import DrawerPanel from '#components/Map/ui/DrawerPanel';
import LatLngLogo from '#components/TopBar/LatLngLogo';
import { useState } from 'react';

const MapTopBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <>
      {/** @ts-ignore */}
      <DrawerPanel
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <div className="absolute top-0 w-full z-40">
        <Navbar isBlurred={true} isBordered={true}>
          <NavbarBrand>
            <Button
              disableRipple
              onPress={() => setIsDrawerOpen(true)}
              className="bg-transparent"
            >
              <p className="font-bold text-inherit text-lg">KEWL</p>
            </Button>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                <LatLngLogo />
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              {/** @ts-ignore */}
              <ConnectButton />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </>
  );
};
export default MapTopBar;
