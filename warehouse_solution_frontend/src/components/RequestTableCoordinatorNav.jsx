import React from "react";
import { HStack, Button, Text } from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import RejectModal from "./RejectModal";
import ConfirmModal from "./ConfirmModal";
import { client } from "../axiosClient/axiosClient";

const RequestTableCoordinatorNav = ({ chosenRecord, fetchData }) => {
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

    const handleConfirm = () => {
        console.log("confirmed");
        onConfirmClose();
    }

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
                    isDisabled={chosenRecord ? false : true}
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
                    isDisabled={chosenRecord?.status !== "Rejected" ? false : true}
                    onClick={onRejectOpen}
                >
                    <DeleteIcon />{" "}
                    <Text as="span" ml={1}>
                        Reject
                    </Text>
                </Button>
            </HStack>
        </>
    );
};

export default RequestTableCoordinatorNav;
