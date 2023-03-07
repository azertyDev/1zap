import Cookies from 'js-cookie';
import { axiosInstance } from 'src/utils/axios';
import { StateCreator } from 'zustand';
import Router from 'next/router';
import { IUser } from 'src/interfaces/IUser';
import { login } from 'src/utils/api';

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

const initialState = {
    data: {
        token: '',
        balance: 0,
        user: {},
    },
};

export const userSlice: StateCreator<IUserSlice> = (set, get) => ({
    ...initialState,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true });

        const json = JSON.stringify({
            email,
            password,
        });

        try {
            const { data, status } = await axiosInstance.post('/login', json);

            // await login(json);

            if (status === 200) {
                set({ data: await data, loading: false, error: null });
                Cookies.set('userInfo', JSON.stringify(data));
                Cookies.set('token', JSON.stringify(data.token));

                Router.push('/dashboard/main');
            }
        } catch (err: any) {
            set(() => ({ error: err.response?.data.error, loading: false }));
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {
        set(() => initialState);
        localStorage.removeItem('bound-store');
        Cookies.remove('userInfo');
        Cookies.remove('token');
        Router.push('/');
    },
});
