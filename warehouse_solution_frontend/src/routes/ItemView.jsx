import React from "react";
import GoodsTable from "../components/GoodsTable";
import GoodsTableCoordinatorNav from "../components/GoodsTableCoordinatorNav";
import GoodsTableEmployeeNav from "../components/GoodsTableEmployeeNav";
import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { client } from "../axiosClient/axiosClient";
import { Spinner } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";

const ItemView = () => {
    const [group] = useOutletContext();
    const isCoordinator = false;

    const [records, setRecords] = useState([]);
    const [tableHead, setTableHead] = useState([]);
    const [queryParams, setQueryParams] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [chosenRecord, setChosenRecord] = useState("");

    const fetchData = async (url = "") => {
        setLoading(true);
        try {
            url ? url : "";
            const response = await client.get(`/items${url}${queryParams}`);
            setRecords(response.data);
            if (tableHead.length === 0) {
                setTableHead(
                    Object.keys(response.data[0]).map((item) => ({
                        sortName: item,
                        headName: item.replaceAll("_", " "),
                        sorted: null,
                        icon: null,
                    }))
                );
            }
        } catch (err) {
            setError(err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [queryParams]);

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt={4}
            w="90%"
        >
            {group === "Coordinator" ? (
                <GoodsTableCoordinatorNav
                    chosenRecord={chosenRecord}
                    setChosenRecord={setChosenRecord}
                    fetchData={fetchData}
                />
            ) : (
                <GoodsTableEmployeeNav
					chosenRecord={chosenRecord}
				/>
            )}
            {loading ? (
                <Spinner size="xl" />
            ) : (
                <GoodsTable
                    records={records}
                    chosenRecord={chosenRecord}
                    setChosenRecord={setChosenRecord}
                    setQueryParams={setQueryParams}
                    tableHead={tableHead}
                    setTableHead={setTableHead}
                />
            )}
        </Flex>
    );
};

export default ItemView;
