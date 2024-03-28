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
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const GoodsTable = ({
    records,
    chosenRecord,
    setChosenRecord,
    queryParams,
    setQueryParams,
    tableHead,
    setTableHead
}) => {
    
    const handleTableHeadState = (headItem) => {
        if (headItem.sorted === null || headItem.sorted === "asc") {
            headItem = {
                ...headItem,
                sorted: "desc",
                icon: <ChevronDownIcon />,
            };
            const newQueryParams = {...queryParams, ordering: `-${headItem.sortName}`} 
            setQueryParams((prev) => newQueryParams);
            return headItem;
        } else {
            headItem = { ...headItem, sorted: "asc", icon: <ChevronUpIcon /> };
            const newQueryParams = {...queryParams, ordering: `${headItem.sortName}`} 
            setQueryParams((prev) => newQueryParams);
            return headItem;
        }
    };

    const handleSort = (sortName) => {
        const newTableHead = tableHead.map((item) =>
            item.sortName === sortName
                ? handleTableHeadState(item)
                : { ...item, sorted: null, icon: null }
        );
        setTableHead(newTableHead);
    };

    return (
        <Flex w="100%">
            <TableContainer w="100%" mt={4}>
                <Table variant="simple" colorScheme="gray" size="sm">
                    <Thead bgColor="gray.300">
                        <Tr>
                            {tableHead.map((item, idx) => (
                                <Th
                                    key={idx}
                                    cursor="pointer"
                                    _hover={{ bgColor: "gray.200" }}
                                    onClick={() => handleSort(item.sortName)}
                                    paddingRight={item.icon ? "0px" : "1rem"}
                                >
                                    {item.headName} {item.icon}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>

                    <Tbody>
                        {records.map((row, idx) => (
                            <Tr
                                key={idx}
                                _hover={
                                    row !== chosenRecord
                                        ? { bgColor: "gray.100" }
                                        : null
                                }
                                cursor="pointer"
                                onClick={() => setChosenRecord((prev) => row)}
                                bgColor={
                                    row.id === chosenRecord.id ? "blue.100" : ""
                                }
                            >
                                {tableHead.map((field, idx2) => (
                                    <Td key={idx2}>{row[field.sortName]}</Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export default GoodsTable;
