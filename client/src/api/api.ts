import axios, { AxiosError, AxiosProxyConfig, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { getFromStorage, saveToStorage } from "./../utils/localStorage";
import { updateToken } from "../redux/slices/user";
import { store } from "../redux";

const baseURL = "http://localhost:7000/api";

const $api = axios.create({
    withCredentials: true,
    baseURL,
});
const $apiAuth = axios.create({
    withCredentials: true,
    baseURL,
});
// $apiAuth.defaults.withCredentials = true

$api.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${getFromStorage("accessToken")}`;
        return config;
    }
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        if (error.response.status === 401 && error.response !== undefined) {
            try {
                const originalRequest = error.config;
                const res = await $api.get<Tokens>(`/auth/refresh`);
                const tokens = res.data;
                saveToStorage("accessToken", tokens.accessToken);
                store.dispatch(updateToken(tokens.accessToken));
                return $api.request(originalRequest);
            } catch (error) {
                console.log(`Interceptors error ocurred - `, error);
            }
        }
        throw error;
    }
);

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

export { $api, $apiAuth };
