import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'

const ConfirmModal = ({isOpen, onClose, handleConfirm}) => {
  return (
    <>    
          <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader borderBottomWidth={1}>
                Confirm request
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure you want to confirm this request?
              </ModalBody>
    
              <ModalFooter display="flex" justifyContent="space-between">
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='solid' colorScheme="teal" onClick={handleConfirm}>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
  )
}

export default ConfirmModal