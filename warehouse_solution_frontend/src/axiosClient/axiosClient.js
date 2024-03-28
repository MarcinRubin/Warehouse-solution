import axios from "axios";
import Cookies from "js-cookie";

const csrftoken = Cookies.get('csrftoken');

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.headers.common['X-CSRFTOKEN'] = csrftoken; 
//axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const client = axios.create({
  baseURL: "http://localhost:8000/v1/api/",
});



