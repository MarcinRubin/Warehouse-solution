import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";

const RequestTable = ({ records, chosenRecord, setChosenRecord }) => {
    const [show, setShow] = useState(new Array(records.length).fill(true));
    const handleShow = (number) => {
        const newShow = show.map((state, idx) =>
            number === idx ? !state : state
        );
        setShow((prev) => newShow);
    };

    return (
        <Flex w="100%" justifyContent="center" alignItems="center">
            <TableContainer w="100%" mt={4}>
                <Table variant="simple" colorScheme="gray" size="sm">
                    <Thead bgColor="gray.300">
                        <Tr>
                            <Th>#</Th>
                            <Th>id</Th>
                            <Th>Employee name</Th>
                            <Th>status</Th>
                            <Th>comment</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {records.map((item, idx) => (
                            <React.Fragment key={idx}>
                                <Tr
                                    _hover={
                                        item !== chosenRecord
                                            ? { bgColor: "gray.100" }
                                            : null
                                    }
                                    cursor="pointer"
                                    onClick={() =>
                                        setChosenRecord((prev) => item)
                                    }
                                    bgColor={
                                        item.id === chosenRecord.id
                                            ? "blue.100"
                                            : ""
                                    }
                                >
                                    <Td>
                                        <IconButton
                                            variant="outline"
                                            aria-label="expand request"
                                            icon={
                                                show[idx] ? (
                                                    <ChevronRightIcon />
                                                ) : (
                                                    <ChevronDownIcon />
                                                )
                                            }
                                            onClick={() => handleShow(idx)}
                                            size="sm"
                                        />
                                    </Td>
                                    <Td>{item.id}</Td>
                                    <Td>{item.employee_name}</Td>
                                    <Td>{item.status}</Td>
                                    <Td>{item.comment}</Td>
                                </Tr>
                                <Tr hidden={show[idx]}>
                                    <Td></Td>
                                    <Td colSpan="4">
                                        <TableContainer
                                            w="100%"
                                            mt={2}
                                            rounded="xl"
                                        >
                                            <Table
                                                variant="simple"
                                                colorScheme="gray"
                                                size="sm"
                                            >
                                                <Thead bgColor="gray.200">
                                                    <Tr>
                                                        <Th>id</Th>
                                                        <Th>Item</Th>
                                                        <Th>quantity</Th>
                                                        <Th>
                                                            price without vat
                                                        </Th>
                                                        <Th>comment</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody bgColor="gray.100">
                                                    {item.request_rows.map(
                                                        (item2, idx2) => (
                                                            <Tr key={idx2}>
                                                                <Td>
                                                                    {item2.id}
                                                                </Td>
                                                                <Td>
                                                                    {item2.item}
                                                                </Td>
                                                                <Td>
                                                                    {
                                                                        item2.quantity
                                                                    }
                                                                </Td>
                                                                <Td>
                                                                    {
                                                                        item2.price_without_vat
                                                                    }
                                                                </Td>
                                                                <Td>
                                                                    {
                                                                        item2.comment
                                                                    }
                                                                </Td>
                                                            </Tr>
                                                        )
                                                    )}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </Td>
                                </Tr>
                            </React.Fragment>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export default RequestTable;
