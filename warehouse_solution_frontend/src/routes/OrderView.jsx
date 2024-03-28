import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { client } from "../axiosClient/axiosClient";
import { Spinner } from "@chakra-ui/react";
import RequestTable from "../components/RequestTable";
import RequestTableCoordinatorNav from "../components/RequestTableCoordinatorNav";
import { useOutletContext } from "react-router-dom";

const OrderView = () => {
    const [group] = useOutletContext();
    const [records, setRecords] = useState([]);
    const [queryParams, setQueryParams] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [chosenRecord, setChosenRecord] = useState("");

    const fetchData = async (url = "") => {
        setLoading(true);
        try {
            url ? url : "";
            const response = await client.get(`/requests${url}${queryParams}`);
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
            {group === "Coordinator" ? <RequestTableCoordinatorNav
                chosenRecord = {chosenRecord}
                fetchData = {fetchData}
            /> : null}

            {loading ? (
                <Spinner size="xl" />
            ) : (
                <RequestTable
                    records={records}
                    chosenRecord={chosenRecord}
                    setChosenRecord={setChosenRecord}
                />
            )}
        </Flex>
    );
};

export default OrderView;
