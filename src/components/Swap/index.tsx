import { Button, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, useDraggable } from "@nextui-org/react"
import { useEffect, useRef } from "react";
import Trade from "./Trade";

const Swap = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const targetRef = useRef(null);
    const {moveProps} = useDraggable({targetRef, canOverflow: true, isDisabled: !isOpen});

    useEffect(()=>{
        if(!isOpen){
            onOpen()
        }
      
    },[])
    return( <Modal className='' size="lg" ref={targetRef}  isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps}  className="flex flex-col gap-1 text-lime-500">Swap</ModalHeader>
              <ModalBody>
                <Trade/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>)
}

export default Swap;
