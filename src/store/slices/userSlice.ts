import axios from 'axios';
import { axiosInstance } from 'src/utils/axios';
import { StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '../types/IUser';

export interface IUserSlice {
    data?: {
        token: string;
        balance: number;
        user: IUser;
    };
    loading?: boolean;
    error?: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const userSlice: StateCreator<IUserSlice> = (set) => ({
    data: {
        token: '',
        balance: 0,
        user: {},
    },
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/login', {
                email,
                password,
            });

            set({ ...response.data });
            // set( {...get().data, ...response.data});
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {},
});
