import {
    Flex,
    Box,
    HStack,
    Button,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { client } from "../axiosClient/axiosClient";
import { Link as ReactRouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ username }) => {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault;
        try {
            const response = await client.post("/logout/");
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    const linkStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        px: 4,
        _hover: {
            backgroundColor: "blue.400",
        },
        borderRadius: "md",
    };

    const menuItemStyle = {
        backgroundColor: "blue.100",
        _hover: {
            backgroundColor: "blue.300",
        },
    };

    return (
        <Flex
            className="my-box"
            flexDirection="row"
            bg="blue.600"
            color="white"
            h="70px"
            px={6}
            justifyContent="space-between"
            top="0"
            zIndex="10"
            w="100%"
        >
            <HStack spacing="3" h="100%">
                <Box width="200px" as={ReactRouterLink} to="/">
                    TMA Warehouse Solution
                </Box>
                <HStack as="nav" gap="0" h="100%">
                    <ChakraLink
                        sx={linkStyle}
                        as={ReactRouterLink}
                        to="/"
                    >
                        List od goods
                    </ChakraLink>
                    <ChakraLink
                        sx={linkStyle}
                        as={ReactRouterLink}
                        to="/requests"
                    >
                        Requests
                    </ChakraLink>
                </HStack>
            </HStack>
            <HStack>
                <Box as="span">Hello {username}!</Box>
                <Button colorScheme="white" variant="outline" onClick={handleLogout}>Logout</Button>
            </HStack>
        </Flex>
    );
};

export default Header;
