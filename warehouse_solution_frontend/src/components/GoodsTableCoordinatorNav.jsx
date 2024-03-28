import React from "react";
import { HStack, Button, Text } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import useFetch from "../customHooks/useFetch";
import { client } from "../axiosClient/axiosClient";

const GoodsTableCoordinatorNav = ({
    chosenRecord,
    setChosenRecord,
    fetchData,
}) => {
    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onClose: onAddClose,
    } = useDisclosure();
    const {
        isOpen: isUpdateOpen,
        onOpen: onUpdateOpen,
        onClose: onUpdateClose,
    } = useDisclosure();
    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onClose: onDeleteClose,
    } = useDisclosure();
    const [data, error, loading] = useFetch("/choices");

    const handleAdd = async (newRecord) => {
        console.log(newRecord);
        try {
            const response = await client.post("/items/", newRecord);
            console.log(response.data);
        } catch (err) {
            console.log("Error occured");
        }
        onAddClose();
        fetchData();
    };

    const handleUpdate = async (updatedRecord) => {
        updatedRecord = {...chosenRecord, ...updatedRecord};
        try {
            const response = await client.patch(`/items/${chosenRecord.id}/`, updatedRecord);
        } catch (err) {
            console.log("Error occured");
        }
        setChosenRecord(updatedRecord);
        onUpdateClose();
        fetchData();
    };

    const handleDelete = async () => {
        try {
            const response = await client.delete(`/items/${chosenRecord.id}`);
        } catch (err) {
            console.log("Error occured");
        }
        setChosenRecord("");
        onDeleteClose();
        fetchData();
    };

    if (loading) {
        return;
    }

    return (
        <>
            {isAddOpen && <AddModal
                isOpen={isAddOpen}
                onClose={onAddClose}
                handleAdd={handleAdd}
                item_group_selection={data.item_group_selection}
                unit_of_measurement_selection={
                    data.unit_of_measurement_selection
                }
            />}

            {isUpdateOpen && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    onClose={onUpdateClose}
                    handleUpdate={handleUpdate}
                    item_group_selection={data.item_group_selection}
                    unit_of_measurement_selection={
                        data.unit_of_measurement_selection
                    }
                    chosenRecord={chosenRecord}
                />
            )}

            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                handleDelete={handleDelete}
            />

            <HStack justifyContent="space-between" w="100%">
                <HStack>
                    <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={onAddOpen}
                    >
                        <AddIcon />{" "}
                        <Text as="span" ml={1}>
                            Create
                        </Text>
                    </Button>
                </HStack>
                <HStack gap={2}>
                    <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={onUpdateOpen}
                        isDisabled={chosenRecord ? false : true}
                    >
                        <EditIcon />{" "}
                        <Text as="span" ml={1}>
                            Update
                        </Text>
                    </Button>
                    <Button
                        variant="solid"
                        colorScheme="red"
                        onClick={onDeleteOpen}
                        isDisabled={chosenRecord ? false : true}
                    >
                        <DeleteIcon />{" "}
                        <Text as="span" ml={1}>
                            Delete
                        </Text>
                    </Button>
                </HStack>
            </HStack>
        </>
    );
};

export default GoodsTableCoordinatorNav;
