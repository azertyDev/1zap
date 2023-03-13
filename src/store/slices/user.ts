import Cookies from 'js-cookie';
import Router from 'next/router';
import { StateCreator } from 'zustand';
import { userApi } from 'src/utils/api';

export interface IUserSlice {
    userData?: IUserData;
    loading?: boolean;
    error?: null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const initialState = {
    userData: {
        token: '',
        balance: 0,
        user: {},
    },
    loading: false,
    error: null,
};

export const userSlice: StateCreator<IUserSlice> = (set, get) => ({
    ...initialState,

    login: async (email, password) => {
        const json = JSON.stringify({
            email,
            password,
        });

        set({ loading: true });

        await userApi
            .login(json)
            .then((response) => {
                set({ userData: response, loading: false });

                Cookies.set('userInfo', JSON.stringify(response));
                Cookies.set('token', JSON.stringify(response.token));

                Router.push('/dashboard/main');
            })
            .catch(({ response }) => {
                set(() => ({ error: response?.data.error.replaceAll(' ', '_'), loading: false }));
            })
            .finally(() => {
                set({ loading: false });
            });
    },
    logout: () => {
        set(() => initialState);
        localStorage.removeItem('global-store');
        Cookies.remove('userInfo');
        Cookies.remove('token');
        Router.push('/');
    },
});
