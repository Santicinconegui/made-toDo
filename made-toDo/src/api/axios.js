import axios from "axios";

const instance = axios.create({
  baseURL: "https://made-to-do-server.vercel.app/",
  withCredentials: true,
});

export default instance;
// baseURL: "http://localhost:3000/api",
