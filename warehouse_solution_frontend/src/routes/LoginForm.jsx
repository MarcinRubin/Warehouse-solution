import { useState } from "react";
import { useNavigate, Link, redirect } from "react-router-dom";
import { client } from "../axiosClient/axiosClient";
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    Heading,
    Flex,
} from "@chakra-ui/react";
import Cookies from "js-cookie";


export async function loader() {
    const session = await client.get("/active_session");
    if (session.data.isAuthenticated) {
        return redirect("/");
    }
    return session.data;
}

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const retrieve_csrf_cookie = await client.get("/csrf_cookie/");
            const csrftoken = Cookies.get("csrftoken");
            client.defaults.headers.common["X-CSRFTOKEN"] = csrftoken;
            const response = await client.post("/login/", {
                username: username,
                password: password,
            });
            navigate("/");
        } catch (err) {
            setLoginError(true);
        }
    };

    return (
        <Container maxW="400px" h="100vh" centerContent justifyContent="center">
            <Flex
                borderWidth={3}
                borderColor="blue.500"
                rounded="xl"
                p={10}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                boxShadow="xl"
            >
                <form onSubmit={handleLogin}>
                    <FormControl>
                        <Heading textAlign="center" mb={8}>
                            Please sign in
                        </Heading>
                        <FormLabel htmlFor="email">Username</FormLabel>
                        <Input
                            placeholder="Enter Username"
                            name="username"
                            autoComplete="off"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            mb={4}
                        />
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            mb={4}
                        />
                        <Flex
                            width="100%"
                            justifyContent="center"
                            alignItems="center"
                            mb={4}
                        >
                            <Button type="submit" colorScheme="blue">
                                Login
                            </Button>
                        </Flex>
                        {loginError ? (
                            <Text color="red.500">
                                Invalid login and/or password! Try again!
                            </Text>
                        ) : null}
                    </FormControl>
                </form>
            </Flex>
        </Container>
    );
};

export default LoginForm;
