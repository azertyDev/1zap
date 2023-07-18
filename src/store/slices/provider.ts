import { toast } from 'react-hot-toast';
import { branchApi, priceListApi, providerApi } from 'src/utils/api';
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
    fetchProviders: (page: string, filter: string, date?: string) => void;
    fetchPriceList: (page: string, sort: string | null, by: string) => void;
    fetchProviderBranches: () => void;
    fetchProviderById: (id: number) => void;
    fetchBranchById: (id: number) => void;
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

    fetchProviders: async (page = '1', filter = '', date = undefined) => {
        set({ loading: true });

        await providerApi
            .fetchProviders(page, filter, date)
            .then((response) => {
                set({ providers: response, loading: false });
            })
            .catch(({ response }) => {
                set({ providers: undefined, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },
    fetchPriceList: async (page = '1', sort, by) => {
        set({ loading: true });

        await priceListApi
            .fetchPriceList(page, 15, sort, by)
            .then((response) => {
                set({ priceList: response, loading: false });
            })
            .catch(({ response }) => {
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
                set({ provider: response, loading: false });
            })
            .catch(({ response }) => {
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
                set({ providerBranches: response });
            })
            .catch(({ response }) => {
                set({ providerBranches: null, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },

    fetchBranchById: async (id: number) => {
        set({ loading: true });

        await branchApi
            .getBranchByIdProvider(id)
            .then((response) => {
                set({ branch: response });
            })
            .catch(({ response }) => {
                set({ branch: null, error: response.data, loading: false });
            })
            .finally(() => {
                set({ loading: false });
            });
    },
});
