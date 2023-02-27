import { axiosInstance } from 'src/utils/axios';
import { StateCreator } from 'zustand';
import { IUser } from '../types/IUser';

export interface IUserSlice {
    data?: {
        token: string;
        balance: number;
        user: IUser;
    };
    moderators: [];
    loading?: boolean;
    error?: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    fetchModerators: () => void;
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
    moderators: [],
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true });

        const json = JSON.stringify({
            email,
            password,
        });

        try {
            const response = await axiosInstance.post('/login', json);

            set({ data: response.data, loading: false });
        } catch (err: any) {
            set({ error: err.response.data.error, loading: false });
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {
        localStorage.removeItem('bound-store');
        set(initialState);
    },

    fetchModerators: async () => {
        try {
            const response = await axiosInstance.get('/moderators/all');

            set({ moderators: response.data });
        } catch (err: any) {
            set({ error: err.message });
        }
    },
});
