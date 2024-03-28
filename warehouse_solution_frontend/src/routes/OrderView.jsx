import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { client } from "../axiosClient/axiosClient";
import { Spinner } from "@chakra-ui/react";
import RequestTable from "../components/RequestTable";
import RequestTableCoordinatorNav from "../components/RequestTableCoordinatorNav";
import { useOutletContext } from "react-router-dom";

const OrderView = () => {
    const [tableHead, setTableHead] = useState([
        { sortName: "id", headName: "id", sorted: null, icon: null },
        { sortName: "employee", headName: "employee name", sorted: null, icon: null },
        { sortName: "status", headName: "status", sorted: null, icon: null },
        { sortName: "comment", headName: "comment", sorted: null, icon: null },
    ]);
    const [group] = useOutletContext();
    const [records, setRecords] = useState([]);
    const [queryParams, setQueryParams] = useState({
        ordering: "",
        search: "",
        status: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [chosenRecord, setChosenRecord] = useState("");

    const fetchData = async (url = "") => {
        setLoading(true);
        try {
            url ? url : "";
            const query = `?ordering=${queryParams.ordering}&&search=${queryParams.search}&&status=${queryParams.status}`;
            const response = await client.get(`/requests${url}${query}`);
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
                <RequestTableCoordinatorNav
                    chosenRecord={chosenRecord}
                    fetchData={fetchData}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                />
            ) : null}

            {loading ? (
                <Spinner size="xl" />
            ) : (
                <RequestTable
                    records={records}
                    chosenRecord={chosenRecord}
                    setChosenRecord={setChosenRecord}
                    queryParams = {queryParams}
                    setQueryParams={setQueryParams}
                    tableHead = {tableHead}
                    setTableHead = {setTableHead}
                />
            )}
        </Flex>
    );
};

export default OrderView;
