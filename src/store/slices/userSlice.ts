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

export const userSlice: StateCreator<IUserSlice> = (set, get) => ({
    data: {
        token: '',
        balance: 0,
        user: {},
    },
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

            // set((state) => ({
            //     data: (state.data = response.data),
            //     loading: false,
            // }));

            set({ data: response.data, loading: false });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {
        // set((state) => ({
        //     data: (state.data = { token: '', balance: 0, user: {} }),
        // }));
        localStorage.removeItem('bound-store');
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
