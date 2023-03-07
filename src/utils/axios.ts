import axios from 'axios';
import { baseURL } from './constants';
const https = require('https');

export const axiosInstance = axios.create({
    // withCredentials: true,
    baseURL,
});

// axios.interceptors.request.use((config) => {
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });
