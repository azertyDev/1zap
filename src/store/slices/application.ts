import { applicationApi } from 'src/utils/api';
import { StateCreator } from 'zustand';
import toast from 'react-hot-toast';
import { IApplicationData } from 'types';

export interface IApplicationSlice {
    applications: any;
    loading: boolean;
    error: null;
    fetchApplications: (status?: string, page?: string, filter?: string, date?: string) => void;
}

const initialState = {
    applications: {
        data: [],
        page: null,
        lastPage: null,
        total: null,
    },
    loading: false,
    error: null,
};

export const applicationSlice: StateCreator<IApplicationSlice> = (set, get) => ({
    ...initialState,

    fetchApplications: async (status = 'active', page = '1', filter = '', date = undefined) => {
        set({ loading: true });

        await applicationApi
            .fetchApplications(status, page, filter, date)
            .then((response) => {
                set({ applications: response, loading: false });

                // toast.success('Successfully fetched!', { icon: '👏' });
            })
            .catch(({ response }) => {
                set({ applications: null, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },
});
