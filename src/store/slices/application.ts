import { applicationApi } from 'src/utils/api';
import { StateCreator } from 'zustand';

export interface IApplicationSlice {
    applications: IApplicationData | null;
    loading: boolean;
    error: null;
    fetchApplications: (status?: string) => void;
    addApplication: (body?: any) => void;
}

const initialState = {
    applications: {
        data: [
            {
                id: null,
                providerName: '',
                providerSurname: '',
                providerPatronymic: '',
                phone: '',
                service: '',
                city: '',
                isActive: '',
                createdAt: '',
                updatedAt: '',
            },
        ],
        page: null,
        lastPage: null,
        total: null,
    },
    loading: false,
    error: null,
};

export const applicationSlice: StateCreator<IApplicationSlice> = (set, get) => ({
    ...initialState,

    fetchApplications: async (status = 'active') => {
        set({ loading: true });

        await applicationApi
            .fetchApplications(status)
            .then((response) => {
                // console.log('fetchApplications', response);

                set({ applications: response, loading: false });
            })
            .catch(({ response }) => {
                // console.log('fetchApplications', response);

                set({ applications: null, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },

    addApplication: async (data) => {
        set({ loading: true });

        await applicationApi
            .addApplication(data)
            .then((response) => {
                set({ loading: false });
            })
            .catch(({ response }) => {
                set({ error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },
});
