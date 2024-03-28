import { client } from "../axiosClient/axiosClient";
import { Outlet} from "react-router-dom";
import { redirect, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import { Container } from "@chakra-ui/react";
import Cookies from "js-cookie";

export async function loader() {
  try{
    const token_retrieve = await client.get("/csrf_cookie/");
    const csrftoken = Cookies.get('csrftoken');
    client.defaults.headers.common['X-CSRFTOKEN'] = csrftoken; 
    const session = await client.get("/active_session");
    if (!session.data.isAuthenticated){
      return redirect("/login");
    }
    return session.data;
  } catch(err) {
    return redirect("/login");
  }
}

function Layout() {

  const {username, group} = useLoaderData();
  return (
    <Container maxW="100%" display="flex" flexDirection="column" gap={0} p={0} m={0} justifyContent="flex-start" alignItems="center">
    <Header username={username}/>
      <Outlet context={[group]}/> 
    </Container>
  )
}

export default Layout;
