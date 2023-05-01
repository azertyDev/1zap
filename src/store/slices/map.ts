import { StateCreator } from 'zustand';

export interface IMapSlice {
    branchId: number;
    productId: number;
    providerId: number;
    bookDetailToggle: boolean | ((prev: boolean) => boolean);
    toggleBookDetail: (
        bookDetailToggle: boolean | ((prev: boolean) => boolean),
        branchId?: number,
        productId?: number,
        providerId?: number
    ) => () => void;
}

const initialState = {
    branchId: 0,
    productId: 0,
    providerId: 0,
    bookDetailToggle: false,
};

export const mapSlice: StateCreator<IMapSlice> = (set, get) => ({
    ...initialState,

    toggleBookDetail(
        toggle: boolean | ((prev: boolean) => boolean),
        branchId: number = 0,
        productId: number = 0,
        providerId: number = 0
    ) {
        return () => set({ bookDetailToggle: toggle, branchId, productId, providerId });
    },
});
