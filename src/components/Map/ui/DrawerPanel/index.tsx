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
  ScrollShadow,
  Tab,
  Tabs,
  Tooltip,
} from '@nextui-org/react';
import { FC, useState } from 'react';
import { PinTAB } from './Tabs/Pins';
import { ClaimTAB } from './Tabs/Claims';
import { PlayerTAB } from './Tabs/Players';
import { ProfileTAB } from './Tabs/Profile';
import { CopyX } from 'lucide-react';

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
          base: 'rounded-lg  bg-black/40 border border-1 border-black/40 shadow-lg',
        }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader
                className="z-[9999] absolute top-0 inset-x-0 flex flex-row gap-2 p-4 py-2 border-b border-black/50 shadow-lg items-center justify-between ">
             
                <div className="w-full flex justify-start gap-2 ">
                  <Tabs classNames={{tabContent:"!text-white" }} size='lg' selectedKey={selected} onSelectionChange={(key) => setSelected(String(key))} color='primary' variant='light' fullWidth>
                    <Tab key={"pins"} title={"Pins"}></Tab>
                    <Tab key={"players"} title={"Millionaires"}></Tab>
                    <Tab key={"history"} title={"Claims"}></Tab>
                    <Tab key={"profile"} title={"Profile"}></Tab>
                  </Tabs>
                  
                </div>
                <div className="flex gap-1 items-center">


                </div>
              </DrawerHeader>
              <DrawerBody className="pt-14 px-0 ">
                <div className="w-full flex flex-row gap-2 items-center justify-between bg-primary/60 text-lime-500 p-2">
                  <h1 className="text-2xl">
                    {(() => {
                      switch (selected) {
                        case "pins":
                          return "Pins";
                        case "history":
                          return "History";
                        case "players":
                          return "Millionaries";
                        case "profile":
                          return "Profile";
                        default:
                          return "Pins";
                      }
                    })()}
                  </h1>
                  <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className=" text-default-400"
                    size="sm"
                    variant="light"
                    onPress={onClose}
                  >
                    <CopyX />
                  </Button>
                </Tooltip>

                </div>

                <ScrollShadow hideScrollBar>
                  <div className='w-full px-2'>

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

                </ScrollShadow>



              </DrawerBody>
              <DrawerFooter className="grid grid-cols-3 items-center justify-center gap-2">

                <div className="flex-none border-1 border-white/5 rounded-small text-center overflow-hidden">
                  <div className="text-tiny bg-black py-0.5 text-white">
                    Pins
                  </div>
                  <div className="flex items-center justify-center font-semibold text-3xl text-lime-500">
                    {contributions.length}
                  </div>
                </div>
                <div className="flex-none border-1 border-white/5 rounded-small text-center overflow-hidden">
                  <div className="text-tiny bg-black py-0.5 text-white">
                    Millionaires
                  </div>
                  <div className="flex items-center justify-center font-semibold text-3xl text-lime-500">
                    {players.length}
                  </div>
                </div>



                <div className="flex-none border-1 border-white/5 rounded-small text-center overflow-hidden">
                  <div className="text-tiny bg-black py-0.5 text-white">
                    Claims
                  </div>
                  <div className="flex items-center justify-center font-semibold text-3xl text-lime-500">
                    {claims.length}
                  </div>
                </div>


              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default DrawerPanel;
