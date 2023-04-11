import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { applicationSlice, IApplicationSlice } from './slices/application';
import { IProviderSlice, providerSlice } from './slices/provider';
import { userSlice, IUserSlice } from './slices/user';
import { IMapSlice, mapSlice } from './slices/map';
import { currencySlice, ICurrencySlice } from './slices/currency';

type StoreState = IUserSlice & IApplicationSlice & IProviderSlice & IMapSlice & ICurrencySlice;

export const useStore = create<StoreState>()(
    devtools(
        persist(
            (...a) => ({
                ...userSlice(...a),
                ...applicationSlice(...a),
                ...providerSlice(...a),
                ...mapSlice(...a),
                ...currencySlice(...a),
            }),
            {
                name: 'global-store',
                partialize: (state) => ({ userData: state.userData }),
            }
        )
    )
);
