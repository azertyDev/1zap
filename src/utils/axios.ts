import axios from 'axios';
import { baseURL } from './constants';
const https = require('https');

export const axiosInstance = axios.create({
    withCredentials: false,
    baseURL,

    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json',
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});
