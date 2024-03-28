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
    FormErrorMessage,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const AddModal = ({ isOpen, onClose, handleAdd, item_group_selection, unit_of_measurement_selection, chosenRecord }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" borderBottomWidth={3} borderBottomColor="blue.100">Add new item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody margin={4}>
                        <form onSubmit={handleSubmit(handleAdd)}>
                            <FormControl isInvalid={errors.name} isRequired>
                                <FormLabel htmlFor="name">Item name</FormLabel>
                                <Input
                                    id="name"
                                    placeholder="name"
                                    {...register("name", {
                                        required: "This is required",
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.item_group} isRequired>
                                <FormLabel htmlFor="Item group">
                                    Item Group
                                </FormLabel>
                                <Select
                                    id="item_group"
                                    placeholder='Select option'
                                    {...register("item_group", {
                                        required: "This is required",
                                    })}
                                >
                                    {item_group_selection.map(
                                        (item, idx) => (
                                            <option key={idx} value={item}>
                                                {item}
                                            </option>
                                        )
                                    )}
                                </Select>
                                <FormErrorMessage>
                                    {errors.item_group && errors.item_group.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.unit_of_measurement} isRequired>
                                <FormLabel htmlFor="Unit of measurement">
                                    Unit of measurements
                                </FormLabel>
                                <Select
                                    id="unit_of_measurement"
                                    placeholder='Select option'
                                    {...register("unit_of_measurement", {
                                        required: "This is required",
                                    })}
                                >
                                    {unit_of_measurement_selection.map(
                                        (item, idx) => (
                                            <option key={idx} value={item}>
                                                {item}
                                            </option>
                                        )
                                    )}
                                </Select>
                                <FormErrorMessage>
                                    {errors.unit_of_measurement && errors.unit_of_measurement.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.quantity} isRequired>
                                <FormLabel htmlFor="Quantity">
                                    Quantity
                                </FormLabel>
                                <NumberInput min={0}>
                                    <NumberInputField
                                        {...register("quantity", {
                                            required: "This is required",
                                        })}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormErrorMessage>
                                    {errors.quantity && errors.quantity.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.price_without_vat} isRequired>
                                <FormLabel htmlFor="Price without VAT">
                                    Price without VAT
                                </FormLabel>
                                <Input
                                    id="price_without_vat"
                                    placeholder="price for single unit"
                                    {...register("price_without_vat", {
                                        required: "This is required",
                                        pattern: /[1-9]+[0-9]?.[0-9]{2}$/
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.price_without_vat && errors.price_without_vat.message || <Text>Provide valid price e.g 10.90</Text>}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.status} isRequired>
                                <FormLabel htmlFor="Status">Status</FormLabel>
                                <Input
                                    id="status"
                                    placeholder="status"
                                    {...register("status", {
                                        required: "This is required",
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.status && errors.status.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.name}>
                                <FormLabel htmlFor="Storage location">
                                    Storage location
                                </FormLabel>
                                <Input
                                    id="storage_location"
                                    placeholder="storage location"
                                    {...register("storage_location")}
                                />
                            </FormControl>

                            <FormControl isInvalid={errors.name}>
                                <FormLabel htmlFor="Contact person">
                                    Contact Person
                                </FormLabel>
                                <Input
                                    id="contact_person"
                                    placeholder="contact_person"
                                    {...register("contact_person")}
                                />
                            </FormControl>
                            <HStack justifyContent="space-between" mt={6}>
                                <Button onClick={onClose}>
                                    Close
                                </Button>
                            <Button
                                colorScheme="blue"
                                type="submit"
                            >
                                Add
                            </Button>
                            </HStack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddModal;
