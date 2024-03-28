import React from "react";
import { HStack, Button, Text, Select, Flex, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddRequestModal from "./AddRequestModal";
import { useDisclosure } from "@chakra-ui/react";
import { client } from "../axiosClient/axiosClient";
import { useState, useEffect } from "react";
import { useToast } from '@chakra-ui/react'
import useFetch from "../customHooks/useFetch";

const GoodsTableEmployeeNav = ({ chosenRecord, queryParams, setQueryParams }) => {
    const {
        isOpen: isAddRequestOpen,
        onOpen: onAddRequestOpen,
        onClose: onAddRequestClose,
    } = useDisclosure();

    const [requestsList, setRequestsList] = useState([]);
    const [chosenRequest, setChosenRequest] = useState("");
    const [addingMode, setAddingMode] = useState("request");
    const requestCreatedToast = useToast();
    const [data, error, loading] = useFetch("/choices");
    const [searchName, setSearchName] = useState("");
    const [unitFilter, setUnitFilter] = useState("");
    const [itemGroupFilter, setItemGroupFilter] = useState("");

    const fetchData = async () => {
        try {
            const response = await client.get('/requests/get_ids');
            setRequestsList(response.data);
        } catch (err) {
            console.log(err);
        } finally {
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddRequest = async (newRequest) => {
        newRequest = addingMode === "request_row" ? {...newRequest.request_row, request: chosenRequest} : newRequest;
        const rowUrl = addingMode === "request_row" ? "_row/" : "/";
        const toastMessage = addingMode === "request_row" ? `Request ${chosenRequest} was updated` : "Request created";
        try {
            const response = await client.post(`/requests${rowUrl}`, newRequest);
            requestCreatedToast({
                title: toastMessage,
                status: 'info',
                duration: 2000,
                isClosable: true,
              })
        } catch (err) {
            requestCreatedToast({
                title: "Error occured, request cannot be update/create",
                status: 'error',
                duration: 2000,
                isClosable: true,
              });
        }
        onAddRequestClose();
        fetchData();
    };

    const handleOpenModal = (value) => {  
        setAddingMode(prev => value);
        onAddRequestOpen();
    }

    const handleSearch = () => {
        const newQueryParams = {
            ...queryParams,
            search: `${searchName}`,
            unit_of_measurement: `${unitFilter}`,
            item_group: `${itemGroupFilter}`,
        };
        setQueryParams(newQueryParams);
    };

    return (
        <>
            {isAddRequestOpen && (
                <AddRequestModal
                    isOpen={isAddRequestOpen}
                    onClose={onAddRequestClose}
                    handleAdd={handleAddRequest}
                    chosenRecord={chosenRecord}
                />
            )}
            <HStack justifyContent="space-between" w="100%">
                <HStack>
                    <Button
                        value="request"
                        variant="solid"
                        colorScheme="blue"
                        isDisabled={chosenRecord ? false : true}
                        onClick={(e) => handleOpenModal(e.currentTarget.value)}
                    >
                        <AddIcon />{" "}
                        <Text as="span" ml={1}>
                            Order
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

                <HStack>
                    <Flex>
                    <Select placeholder="Choose Request" value={chosenRequest} onChange={(e) => setChosenRequest(prev => e.target.value) }>
                        {requestsList?.map((item, idx) => (
                            <option value={item.id} key={idx}>{`Request ${item.id}`}</option>
                        ))}
                    </Select>
                    </Flex>
                    
                    <Button value="request_row" variant="solid" colorScheme="blue" isDisabled={chosenRequest ? false : true} onClick={(e) => handleOpenModal(e.currentTarget.value)}>
                        <AddIcon />{" "}
                        <Text as="span" ml={1}>
                            Add to Request
                        </Text>
                    </Button>
                </HStack>
            </HStack>
        </>
    );
};

export default GoodsTableEmployeeNav;
