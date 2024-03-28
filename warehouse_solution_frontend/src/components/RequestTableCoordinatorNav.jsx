import React from "react";
import { HStack, Button, Text, Input, Select } from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import RejectModal from "./RejectModal";
import ConfirmModal from "./ConfirmModal";
import { client } from "../axiosClient/axiosClient";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const RequestTableCoordinatorNav = ({ chosenRecord, fetchData, queryParams, setQueryParams }) => {
    const {
        isOpen: isConfirmOpen,
        onOpen: onConfirmOpen,
        onClose: onConfirmClose,
    } = useDisclosure();
    const {
        isOpen: isRejectOpen,
        onOpen: onRejectOpen,
        onClose: onRejectClose,
    } = useDisclosure();

    const [searchName, setSearchName] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const confirmToast = useToast();

    const handleReject = async (comment) => {    
        try {
            const response = await client.patch(`/requests/${chosenRecord.id}/`, {status: "Rejected", comment: comment});
            console.log(response.data);
        } catch (err) {
            console.log("Error occured");
        }
        onRejectClose();
        fetchData();
    };

    const handleConfirm = async () => {
        console.log("confirmed");
        try {
            const response = await client.patch(`/requests/${chosenRecord.id}/confirm_request/`, {status: "Approved"});
            confirmToast({
                title: "Request was accepted",
                status: 'info',
                duration: 2000,
                isClosable: true,
              });
              fetchData();
        } catch (err) {
            console.log(err.response.data.message)
            confirmToast({
                title: err.response.data.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
              })
        }
        onConfirmClose();
    }

    const handleSearch = () => {
        const newQueryParams = {
            ...queryParams,
            search: `${searchName}`,
            status: `${statusFilter}`
        };
        setQueryParams(newQueryParams);
    };

    return (
        <>
            {isRejectOpen && <RejectModal
                isOpen = {isRejectOpen}
                onClose = {onRejectClose}
                handleReject = {handleReject}
            />}

            {isConfirmOpen && <ConfirmModal
                isOpen = {isConfirmOpen}
                onClose = {onConfirmClose}
                handleConfirm = {handleConfirm}
            />}

            <HStack w="100%">
                <Button
                    variant="solid"
                    colorScheme="blue"
                    isDisabled={(chosenRecord && chosenRecord?.status !== "Rejected" && chosenRecord?.status !== "Approved") ? false : true}
                    onClick = {onConfirmOpen}
                >
                    <CheckIcon />{" "}
                    <Text as="span" ml={1}>
                        Confirm
                    </Text>
                </Button>
                <Button
                    variant="solid"
                    colorScheme="red"
                    isDisabled={(chosenRecord && chosenRecord?.status !== "Rejected" && chosenRecord?.status !== "Approved") ? false : true}
                    onClick={onRejectOpen}
                >
                    <DeleteIcon />{" "}
                    <Text as="span" ml={1}>
                        Reject
                    </Text>
                </Button>
                <HStack gap={1} ml={4}>
                        <Input
                            value={searchName}
                            placeholder="Search ID"
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <Select
                            placeholder="Select status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                                <option value="New">
                                    New
                                </option>
                                <option value="Approved">
                                    Approved
                                </option>
                                <option value="Rejected">
                                    Rejected
                                </option>
                        </Select>
                        <Button onClick={handleSearch} w="200px">
                            Search
                        </Button>
                    </HStack>
            </HStack>
            
        </>
    );
};

export default RequestTableCoordinatorNav;
