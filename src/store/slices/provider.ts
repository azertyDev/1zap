import { toast } from 'react-hot-toast';
import { priceListApi, providerApi } from 'src/utils/api';
import { StateCreator } from 'zustand';
import { IProviderData, IProviders, IBranchData } from 'types';
import Router from 'next/router';

export interface IProviderSlice {
    providers: IProviders;
    provider: IProviderData | null;
    providerBranches: IBranchData[] | null;
    priceList: any;
    branch: IBranchData[] | null;
    loading: boolean;
    error: null;
    fetchProviders: () => void;
    fetchPriceList: () => void;
    fetchProviderBranches: () => void;
    fetchProviderById: (id: number) => void;
    fetchBranchById: (id: number) => void;
    addProvider: (data: IProviderData) => void;
}

const initialState = {
    providers: {
        data: [
            {
                id: null,
                fullName: '',
                phone: '',
                companyName: '',
                email: '',
                createdAt: '',
            },
        ],
        page: null,
        lastPage: null,
        total: null,
    },
    provider: null,
    providerBranches: null,
    priceList: [],
    branch: null,
    loading: false,
    error: null,
};

export const providerSlice: StateCreator<IProviderSlice> = (set, get) => ({
    ...initialState,

    fetchProviders: async () => {
        set({ loading: true });

        await providerApi
            .fetchProviders()
            .then((response) => {
                // console.log('fetchProviders', response);

                set({ providers: response });
            })
            .catch(({ response }) => {
                // console.log('Error', response);

                set({ providers: undefined, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },
    fetchPriceList: async () => {
        set({ loading: true });

        await priceListApi
            .fetchPriceList()
            .then((response) => {
                // console.log('fetchPriceList', response);

                set({ priceList: response });
            })
            .catch(({ response }) => {
                // console.log('Error', response);

                set({ priceList: undefined, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },

    fetchProviderById: async (id: number) => {
        set({ loading: true });

        await providerApi
            .fetchProviderById(id)
            .then((response) => {
                // console.log('fetchProviderById', response);

                set({ provider: response });
            })
            .catch(({ response }) => {
                // console.log('Error', response);

                set({ provider: null, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },

    fetchProviderBranches: async () => {
        set({ loading: true });

        await providerApi
            .fetchProviderBranches()
            .then((response) => {
                // console.log('fetchProviderBranches', response);

                set({ providerBranches: response });
            })
            .catch(({ response }) => {
                // console.log('Error', response);

                set({ providerBranches: null, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },

    fetchBranchById: async (id: number) => {
        set({ loading: true });

        await providerApi
            .fetchBranchById(id)
            .then((response) => {
                // console.log('fetchBranchById', response);

                set({ branch: response });
            })
            .catch(({ response }) => {
                // console.log('Error', response);

                set({ branch: null, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },

    addProvider: async (data: any) => {
        await providerApi
            .addProvider(data)
            .then((response) => {
                toast.success('Provider created', { icon: '👏', duration: 5000 });
                Router.push('/dashboard/providers');
            })
            .catch(({ response }) => {
                console.log('@addProvider error:', response);

                toast.success(response.data.error, { icon: '😫', duration: 5000 });

                // set({ branch: null, error: response.data.error, loading: false });
            });
    },
});
