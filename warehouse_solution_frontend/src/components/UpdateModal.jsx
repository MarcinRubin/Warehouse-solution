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
import { useForm, Controller } from "react-hook-form";

const UpdateModal = ({
    isOpen,
    onClose,
    handleUpdate,
    item_group_selection,
    unit_of_measurement_selection,
    chosenRecord,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: chosenRecord.name,
            item_group: chosenRecord.item_group,
            unit_of_measurement: chosenRecord.unit_of_measurement,
            quantity: chosenRecord.quantity,
            price_without_vat: chosenRecord.price_without_vat,
            status: chosenRecord.status,
            storage_location: chosenRecord.storage_location,
            contact_person: chosenRecord.contact_person
        },
    });

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
                        Update Item
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody margin={4}>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <FormControl
                                isInvalid={errors.name}
                                isRequired={true}
                            >
                                <FormLabel htmlFor="name">Item name</FormLabel>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input {...field} />}
                                />
                                <FormErrorMessage>
                                    {errors.name && (
                                        <Text>This field is required</Text>
                                    )}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={errors.item_group}
                                isRequired
                            >
                                <FormLabel htmlFor="Item group">
                                    Item Group
                                </FormLabel>
                                <Controller
                                    name="item_group"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field}>
                                            {item_group_selection.map(
                                                (item, idx) => (
                                                    <option
                                                        key={idx}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                    )}
                                />
                                <FormErrorMessage>
                                    {errors.item_group &&
                                        errors.item_group.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={errors.unit_select}
                                isRequired
                            >
                                <FormLabel htmlFor="Unit of measurement">
                                    Unit of measurements
                                </FormLabel>
                                <Controller
                                    name="unit_of_measurement"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field}>
                                            {unit_of_measurement_selection.map(
                                                (item, idx) => (
                                                    <option
                                                        key={idx}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                    )}
                                />
                                <FormErrorMessage>
                                    {errors.unit_of_measurement &&
                                        errors.unit_of_measurement.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.quantity} isRequired>
                                <FormLabel htmlFor="Quantity">
                                    Quantity
                                </FormLabel>
                                <Controller
                                    name="quantity"
                                    control={control}
                                    render={({ field }) => (
                                        <NumberInput min={0} {...field}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    )}
                                />
                                <FormErrorMessage>
                                    {errors.quantity && errors.quantity.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={errors.price_without_vat}
                                isRequired
                            >
                                <FormLabel htmlFor="Price without VAT">
                                    Price without VAT
                                </FormLabel>
                                <Controller
                                    name="price_without_vat"
                                    control={control}
                                    rules={{
                                        required: "This is required",
                                        pattern: /[1-9]+[0-9]?.[0-9]{2}$/,
                                    }}
                                    render={({ field }) => <Input {...field} />}
                                />
                                <FormErrorMessage>
                                    {errors.price_without_vat && (
                                        <Text>Invalid price</Text>
                                    )}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.status} isRequired>
                                <FormLabel htmlFor="Status">Status</FormLabel>
                                <Controller
                                    name="status"
                                    control={control}
                                    rules={{
                                        required: "This field is required",
                                    }}
                                    render={({ field }) => <Input {...field} />}
                                />
                                <FormErrorMessage>
                                    {errors.status && errors.status.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.storage_location}>
                                <FormLabel htmlFor="Storage location">
                                    Storage location
                                </FormLabel>
                                <Controller
                                    name="storage_location"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormControl>

                            <FormControl isInvalid={errors.contact_person}>
                                <FormLabel htmlFor="Contact person">
                                    Contact Person
                                </FormLabel>
                                <Controller
                                    name="contact_person"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormControl>
                            <HStack justifyContent="space-between" mt={6}>
                                <Button onClick={onClose}>Close</Button>
                                <Button colorScheme="blue" type="submit">
                                    Update
                                </Button>
                            </HStack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateModal;
