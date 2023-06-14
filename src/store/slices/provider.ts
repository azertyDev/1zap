import { toast } from 'react-hot-toast';
import { priceListApi, providerApi } from 'src/utils/api';
import { StateCreator } from 'zustand';
import { IProviderData, IProviders, IBranchData } from 'types';
import Router from 'next/router';

export interface IProviderSlice {
    providers: any;
    provider: IProviderData | null;
    providerBranches: IBranchData[] | null;
    priceList: any;
    branch: IBranchData[] | null;
    loading: boolean;
    error: null;
    fetchProviders: (page: string) => void;
    fetchPriceList: (page?: string, limit?: number) => void;
    fetchProviderBranches: () => void;
    fetchProviderById: (id: number) => void;
    fetchBranchById: (id: number) => void;
    addProvider: (data: IProviderData) => void;
}

const initialState = {
    providers: {
        data: [],
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

    fetchProviders: async (page = '1') => {
        set({ loading: true });

        await providerApi
            .fetchProviders(page)
            .then((response) => {
                // console.log('fetchProviders', response);

                set({ providers: response, loading: false });
            })
            .catch(({ response }) => {
                // console.log('Error', response);

                set({ providers: undefined, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },
    fetchPriceList: async (page, limit) => {
        set({ loading: true });

        await priceListApi
            .fetchPriceList(page, limit)
            .then((response) => {
                // console.log('fetchPriceList', response);

                set({ priceList: response, loading: false });
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

                set({ provider: response, loading: false });
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
                toast.success('Провайдер создан', { duration: 5000 });
                Router.push('/dashboard/providers?page=1&pageSec=1');
            })
            .catch(({ response }) => {
                console.log('@addProvider error:', response);

                toast.success(response.data.error, { icon: '😫', duration: 5000 });

                // set({ branch: null, error: response.data.error, loading: false });
            });
    },
});
