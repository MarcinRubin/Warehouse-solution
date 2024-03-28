import React from "react";
import { HStack, Button, Text, Input, Select } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import useFetch from "../customHooks/useFetch";
import { client } from "../axiosClient/axiosClient";
import { useState } from "react";

const GoodsTableCoordinatorNav = ({
    chosenRecord,
    setChosenRecord,
    fetchData,
    queryParams,
    setQueryParams,
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
    const [searchName, setSearchName] = useState("");
    const [unitFilter, setUnitFilter] = useState("");
    const [itemGroupFilter, setItemGroupFilter] = useState("");

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
        updatedRecord = { ...chosenRecord, ...updatedRecord };
        try {
            const response = await client.patch(
                `/items/${chosenRecord.id}/`,
                updatedRecord
            );
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

    const handleSearch = () => {
        const newQueryParams = {
            ...queryParams,
            search: `${searchName}`,
            unit_of_measurement: `${unitFilter}`,
            item_group: `${itemGroupFilter}`,
        };
        setQueryParams(newQueryParams);
    };

    if (loading) {
        return;
    }

    return (
        <>
            {isAddOpen && (
                <AddModal
                    isOpen={isAddOpen}
                    onClose={onAddClose}
                    handleAdd={handleAdd}
                    item_group_selection={data.item_group_selection}
                    unit_of_measurement_selection={
                        data.unit_of_measurement_selection
                    }
                />
            )}

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
                    <HStack gap={1} ml={4}>
                        <Input
                            value={searchName}
                            placeholder="search name"
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <Select
                            placeholder="select unit"
                            value={unitFilter}
                            onChange={(e) => setUnitFilter(e.target.value)}
                        >
                            {data?.unit_of_measurement_selection.map(
                                (item, idx) => (
                                    <option key={idx} value={item}>
                                        {item}
                                    </option>
                                )
                            )}
                        </Select>
                        <Select
                            placeholder="select group"
                            value={itemGroupFilter}
                            onChange={(e) => setItemGroupFilter(e.target.value)}
                        >
                            {data?.item_group_selection.map((item, idx) => (
                                <option key={idx} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Select>
                        <Button onClick={handleSearch} w="200px">
                            Search
                        </Button>
                    </HStack>
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
