import axios from "axios";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

const apiInstance = axios.create({
  baseURL: serverURL,
  timeout: 5000,
});

export default apiInstance;
