import { useContributionContext } from '#src/context/GlobalStateContext';
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Image,
  Link,
  Tab,
  Tabs,
  Tooltip,
} from '@nextui-org/react';
import { FC, useState } from 'react';
import { PinTAB } from './Tabs/Pins';
import { ClaimTAB } from './Tabs/Claims';
import { PlayerTAB } from './Tabs/Players';
import { ProfileTAB } from './Tabs/Profile';

interface DrawerPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerPanel: FC<DrawerPanelProps> = ({ isOpen, onClose }) => {
  const { contributions, players, claims, assets } = useContributionContext();
  const [selected, setSelected] = useState<string>("pins");

  return (
    <>
      <Drawer
        hideCloseButton
        backdrop="blur"
        placement="left"
        classNames={{
          base: 'm-2  rounded-medium',
        }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="z-[9999] absolute top-0 inset-x-0 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 items-center justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-sm">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-default-400"
                    size="sm"
                    variant="light"
                    onPress={onClose}
                  >
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                  </Button>
                </Tooltip>
                <div className="w-full flex justify-start gap-2">
                  <Tabs selectedKey={selected} onSelectionChange={(key) => setSelected(String(key))} color='primary' variant='light' fullWidth>
                    <Tab key={"pins"} title={"Pins"}></Tab>
                    <Tab key={"players"} title={"Players"}></Tab>
                    <Tab key={"history"} title={"History"}></Tab>
                    <Tab key={"profile"} title={"Profile"}></Tab>
                  </Tabs>
            
                </div>
                <div className="flex gap-1 items-center">

                 
                </div>
              </DrawerHeader>
              <DrawerBody className="pt-16">
                <div>
            
                {
    (() => {
      switch (selected) {
        case "pins":
          return <PinTAB />;
        case "history":
          return <ClaimTAB />;
        case "players":
          return <PlayerTAB />;
        case "profile":
          return <ProfileTAB />;
        default:
          return <PinTAB />;
      }
    })()
  }
                
                </div>
        


              </DrawerBody>
              <DrawerFooter className="flex flex-col gap-1">
             
            
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default DrawerPanel;
