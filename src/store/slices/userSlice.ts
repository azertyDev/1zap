import Cookies from 'js-cookie';
import { axiosInstance } from 'src/utils/axios';
import { StateCreator } from 'zustand';
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
            const { data } = await axiosInstance.post('/login', json);

            set({ data: await data, loading: false, error: null });

            Cookies.set('userInfo', JSON.stringify(data));
            Cookies.set('token', JSON.stringify(data.token));
        } catch (err: any) {
            set(() => ({ error: err.response.data.error, loading: false }));
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {
        set(initialState);
    },
});
