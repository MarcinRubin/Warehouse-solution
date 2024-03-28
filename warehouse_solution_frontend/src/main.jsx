import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout, {loader as rootloader} from "./routes/Layout.jsx";
import LoginForm, {loader as loginloader} from "./routes/LoginForm.jsx";
import ItemView from "./routes/ItemView.jsx";
import OrderView from "./routes/OrderView.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        loader: rootloader,
        children: [
            {
                path: "/",
                element: <ItemView />,
            },
            {
                path: "/requests",
                element: <OrderView />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginForm />,
        loader: loginloader,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
