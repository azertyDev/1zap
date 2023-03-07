import { AxiosPromise } from 'axios';
import { axiosInstance } from './axios';
import type { IUser } from 'src/interfaces/IUser';

export type LoginParams = {
    email: string;
    password: string;
};

export const login = async (params: LoginParams): AxiosPromise<IUser> => {
    console.log('params', params);

    return await axiosInstance.post('/login', { params });
};


// export const s