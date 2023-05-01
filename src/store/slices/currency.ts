import { StateCreator } from 'zustand';

export interface ICurrencySlice {
    currency: string;
    setCurrency: (val: string) => void;
}

const initialState = {
    currency: 'uzs',
};

export const currencySlice: StateCreator<ICurrencySlice> = (set, get) => ({
    ...initialState,
    setCurrency(val: string) {
        set({ currency: val });
    },
});
