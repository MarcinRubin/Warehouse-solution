import {
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const AddRequestRowModal = ({ isOpen, onClose, handleAdd, chosenRecord }) => {
    const [quantity, setQuantity] = useState(chosenRecord.quantity);
    const [text, setText] = useState("");

    const submitRequest = () => {
        const newRequest = {
            request_row: {
                comment: text,
                item: chosenRecord.id,
                quantity: quantity,
                price_without_vat: (
                    quantity * chosenRecord.price_without_vat
                ).toFixed(2),
            },
        };
        handleAdd(newRequest);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        textAlign="center"
                        borderBottomWidth={3}
                        borderBottomColor="blue.100"
                    >
                        Order Item
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody margin={4}>
                        <FormLabel htmlFor="Quantity">Item name</FormLabel>
                        <Input value={chosenRecord.name} isDisabled={true} />
                        <FormLabel htmlFor="Unit of measurement">
                            Item name
                        </FormLabel>
                        <Select isDisabled={true}>
                            <option value={chosenRecord.unit_of_measurement}>
                                {chosenRecord.unit_of_measurement}
                            </option>
                        </Select>

                        <FormControl isRequired>
                            <FormLabel htmlFor="Quantity">Quantity</FormLabel>
                            <NumberInput
                                min={0}
                                max={chosenRecord.quantity}
                                onChange={(valueString) =>
                                    setQuantity(valueString)
                                }
                                value={quantity}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormLabel htmlFor="PriceWithoutVat">
                            Price without VAT
                        </FormLabel>
                        <Input
                            value={(
                                quantity * chosenRecord.price_without_vat
                            ).toFixed(2)}
                            isDisabled={true}
                        ></Input>
                        <FormLabel htmlFor="Comment">Comment</FormLabel>
                        <Textarea
                            value={text}
                            onChange={(e) => setText((prev) => e.target.value)}
                            placeholder="Write your comment here"
                        />

                        <HStack justifyContent="space-between" mt={6}>
                            <Button onClick={onClose}>Close</Button>
                            <Button colorScheme="blue" onClick={submitRequest}>
                                Order
                            </Button>
                        </HStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddRequestRowModal;
