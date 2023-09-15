import Axios from "axios";

console.log("Axios: ", process.env.NEXT_PUBLIC_API_URL);

const http = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default http;
