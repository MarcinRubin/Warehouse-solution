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

    const [records, setRecords] = useState([]);
    const [queryParams, setQueryParams] = useState({
        ordering: "",
        search: "",
        unit_of_measurement: "",
        item_group: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [chosenRecord, setChosenRecord] = useState("");

    const [tableHead, setTableHead] = useState([
        { sortName: "id", headName: "id", sorted: null, icon: null },
        { sortName: "name", headName: "name", sorted: null, icon: null },
        {
            sortName: "item_group",
            headName: "item group",
            sorted: null,
            icon: null,
        },
        {
            sortName: "unit_of_measurement",
            headName: "unit of measurement",
            sorted: null,
            icon: null,
        },
        {
            sortName: "quantity",
            headName: "quantity",
            sorted: null,
            icon: null,
        },
        {
            sortName: "price_without_vat",
            headName: "price without vat",
            sorted: null,
            icon: null,
        },
        { sortName: "status", headName: "status", sorted: null, icon: null },
        {
            sortName: "storage_location",
            headName: "storage location",
            sorted: null,
            icon: null,
        },
        {
            sortName: "contact_person",
            headName: "contant person",
            sorted: null,
            icon: null,
        },
        { sortName: "photo", headName: "photo", sorted: null, icon: null },
    ]);

    const fetchData = async (url = "") => {
        setLoading(true);
        try {
            url ? url : "";
            const query = `?ordering=${queryParams.ordering}&&search=${queryParams.search}&&unit_of_measurement=${queryParams.unit_of_measurement}&&item_group=${queryParams.item_group}`;
            const response = await client.get(`/items${url}${query}`);
            setRecords(response.data);
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
                    queryParams = {queryParams}
                    setQueryParams = {setQueryParams}
                />
            ) : (
                <GoodsTableEmployeeNav
					chosenRecord={chosenRecord}
                    queryParams = {queryParams}
                    setQueryParams = {setQueryParams}
				/>
            )}
            {loading ? (
                <Spinner size="xl" />
            ) : (
                <GoodsTable
                    records={records}
                    chosenRecord={chosenRecord}
                    setChosenRecord={setChosenRecord}
                    queryParams = {queryParams}
                    setQueryParams={setQueryParams}
                    tableHead={tableHead}
                    setTableHead={setTableHead}
                />
            )}
        </Flex>
    );
};

export default ItemView;
