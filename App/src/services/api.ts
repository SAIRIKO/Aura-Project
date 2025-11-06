import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.0.12.29:3000", // backend
});
