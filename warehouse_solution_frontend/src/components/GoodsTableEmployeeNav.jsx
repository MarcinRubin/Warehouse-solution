import React from "react";
import { HStack, Button, Text, Select, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddRequestModal from "./AddRequestModal";
import { useDisclosure } from "@chakra-ui/react";
import { client } from "../axiosClient/axiosClient";
import { useState, useEffect } from "react";
import { useToast } from '@chakra-ui/react'

const GoodsTableEmployeeNav = ({ chosenRecord }) => {
    const {
        isOpen: isAddRequestOpen,
        onOpen: onAddRequestOpen,
        onClose: onAddRequestClose,
    } = useDisclosure();

    const [requestsList, setRequestsList] = useState([]);
    const [chosenRequest, setChosenRequest] = useState("");
    const [addingMode, setAddingMode] = useState("request");
    const requestCreatedToast = useToast();

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
            //console.log("Error occured");
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
        console.log(value);    
        setAddingMode(prev => value);
        onAddRequestOpen();
    }

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
