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

const DeleteModal = ({isOpen, onClose, handleDelete}) => {
    return (
        <>    
          <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Delete Item
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure you want to delete this item from the database? It would be inpossible to undone this operation
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='solid' colorScheme="red" onClick={handleDelete}>Delete</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default DeleteModal