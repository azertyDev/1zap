import Cookies from 'js-cookie';
import Router from 'next/router';
import { StateCreator } from 'zustand';
import { userApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { i18n } from 'next-i18next';

export interface IUserSlice {
    userData?: IUserData;
    loading?: boolean;
    error?: null;
    login: (email: string, password: string, setErrors: any) => void;
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

    login: async (email, password, setErrors) => {
        const json = JSON.stringify({
            email,
            password,
        });

        set({ loading: true });

        await userApi
            .login(json)
            .then((response) => {
                set({ userData: response, loading: false });

                let oneDay = new Date(new Date().getTime() + 24 * 3600 * 1000);
                // Expiration day: 1
                Cookies.set('userInfo', JSON.stringify(response), { expires: oneDay });
                Cookies.set('token', JSON.stringify(response.token), { expires: oneDay });
                console.log(response.user.role);

                response.user.role === 'admin' || response.user.role === 'moderator'
                    ? Router.push('/dashboard/main')
                    : Router.push('/cabinet/main');
            })
            .catch(({ response }) => {
                set(() => ({ error: response?.data.error.replaceAll(' ', '_'), loading: false }));
                toast.error(i18n!.t('helpers:data_err'));
                setErrors({ password: 'data_err', email: 'data_err' });
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
