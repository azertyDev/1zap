import Cookies from 'js-cookie';
import Router from 'next/router';
import { StateCreator } from 'zustand';
import { userApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { i18n } from 'next-i18next';
import { IUserData } from 'types';

export interface IUserSlice {
    userData?: IUserData;
    loading?: boolean;
    error?: null;
    login: (email: string, password: string, setErrors: any, setIsSubmiting: any) => void;
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

    login: async (email, password, setErrors, setIsSubmiting) => {
        const json = JSON.stringify({
            email,
            password,
        });

        set({ loading: true });
        setIsSubmiting(true);
        await userApi
            .login(json)
            .then((response) => {
                set({ userData: response, loading: false });

                let oneDay = new Date(new Date().getTime() + 24 * 3600 * 1000);
                // Expiration day: 1
                Cookies.set('userInfo', JSON.stringify(response), { expires: oneDay });
                Cookies.set('token', JSON.stringify(response.token), { expires: oneDay });

                response.user.role === 'admin' || response.user.role === 'moderator'
                    ? Router.push('/dashboard/providers?page=1&pageSec=1')
                    : Router.push('/cabinet/main');
            })
            .catch(({ response }) => {
                set(() => ({ error: response?.data.error.replaceAll(' ', '_'), loading: false }));
                toast.error(i18n!.t('helpers:data_err'));
                setErrors({ password: 'data_err', email: 'data_err' });
            })
            .finally(() => {
                set({ loading: false });
                setIsSubmiting(false);
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
