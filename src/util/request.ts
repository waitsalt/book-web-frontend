import { useUserStore } from "@/store/user";
import axios from "axios";
import router from "./router";
import type { UserClaims, UserRefreshClaims } from "@/model/user";
import { jwtDecode } from "jwt-decode";
import { getRefreshAccessToken } from "@/api/user/refreshAccessToken";

const base_url = "http://127.0.0.1:8000/api";


// 不进行认证
const request = axios.create({
    baseURL: base_url,
    timeout: 5000
});

request.interceptors.request.use(
    (config) => {
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


// 进行认证
const request_auth = axios.create({
    baseURL: base_url,
    timeout: 5000
});

request_auth.interceptors.request.use(
    async (config) => {
        const userStore = useUserStore();
        const userAuth = userStore.userAuth;
        const userClaims: UserClaims = jwtDecode(userAuth.access_token);
        if (userAuth.access_token !== '' && userClaims.exp > Date.now()) {
            config.headers.Authorization = `Bearer ${userAuth.access_token}`;
        } else {
            const access_token = await getRefreshAccessToken();
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    }
)

request_auth.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
)


// 刷新认证
const request_refresh_auth = axios.create({
    baseURL: base_url,
    timeout: 5000,
})

request_refresh_auth.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        const userAuth = userStore.userAuth;
        const userRefreshClaims: UserRefreshClaims = jwtDecode(userAuth.refresh_token);
        if (userAuth.refresh_token !== '' && userRefreshClaims.exp > Date.now()) {
            config.headers.Authorization = `Bearer ${userAuth.refresh_token}`;
        } else {
            router.push('/signin')
        }
        return config;
    }
)

request_refresh_auth.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// 不进行认证
const request_util = axios.create({
    baseURL: base_url,
    timeout: 5000
});
export { request, request_auth, request_refresh_auth, request_util };