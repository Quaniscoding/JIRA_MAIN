import axios from "axios";
import { getStringLocal } from "./config";
import { DOMAIN_BE, USER_LOGIN } from "./constant";

export const http = axios.create({
    baseURL: DOMAIN_BE,
    timeout: 5000
})
http.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            token: getStringLocal(USER_LOGIN),
            Authorization: `Bearer ${getStringLocal(USER_LOGIN)}`
        }
    }
}, err => { console.log(err) })
