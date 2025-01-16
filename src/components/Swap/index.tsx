import { Button, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, useDraggable } from "@nextui-org/react"
import { useEffect, useRef } from "react";
import Trade from "./Trade";

type SwapProps = {
    isOpen: boolean;
    onClose: () => void; // Define `onOpen` correctly as a function
    onOpen: () => void; // Define `onOpen` correctly as a function
    onOpenChange: (open: boolean) => void;
  };

const Swap: React.FC<SwapProps> = ({ isOpen,onOpen,onClose, onOpenChange }) => {
    const targetRef = useRef(null);
    const {moveProps} = useDraggable({targetRef, canOverflow: true, isDisabled: !isOpen});

    useEffect(()=>{
        if(!isOpen){
            onOpen()
        }
      
    },[])
    return( <Modal className='bg-white/40 backdrop-blur-sm' size="lg" ref={targetRef}  isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps}  className="flex flex-col gap-1 text-black">Swap</ModalHeader>
              <ModalBody>
                <Trade/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>)
}

export default Swap;
