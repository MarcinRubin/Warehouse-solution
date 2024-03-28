import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormLabel,
    Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const RejectModal = ({ isOpen, onClose, handleReject}) => {
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        handleReject(comment);
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderBottomWidth={1}>Reject the Request</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel htmlFor="name">Explain your rejection</FormLabel>
                        <Textarea 
                            value={comment}
                            onChange={(e)=>setComment(prev => e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter display="flex" justifyContent="space-between">
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            variant="solid"
                            colorScheme="red"
                            onClick={handleSubmit}
                        >
                            Reject
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RejectModal;
