import axios from "axios";
import { BASE_URL } from "./api";

export const instance = axios.create({
  baseURL: BASE_URL,
});
