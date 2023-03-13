import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL } from './constants';

export const axiosInstance = axios.create({
    withCredentials: false,
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('token');

    if (token) {
        config.headers.Authorization = 'Bearer ' + JSON.parse(token);
    }
    return config;
});
