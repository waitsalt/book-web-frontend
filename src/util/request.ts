import axios from "axios";
import { useUserAuthStore } from "@/store/userAuth";

const userAuthStore = useUserAuthStore();

const base_url = "http://127.0.0.1:8000/api";

const request = axios.create({
    baseURL: base_url,
    timeout: 5000
});

request.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${userAuthStore.userAuth.token}`;
        return config;
    }
)

request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default request;