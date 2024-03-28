import { Flex } from "@chakra-ui/react";
import ItemView from "./routes/ItemView";
import OrderView from "./routes/OrderView";
import RequestTable from "./components/RequestTable";

function App() {
    return (
        
        <Flex w="100%" justifyContent="center" alignItems="center">
            <OrderView/>
        </Flex>
    );
}

export default App;
