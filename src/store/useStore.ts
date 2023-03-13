import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { applicationSlice, IApplicationSlice } from './slices/application';
import { IProviderSlice, providerSlice } from './slices/provider';
import { userSlice, IUserSlice } from './slices/user';

type StoreState = IUserSlice & IApplicationSlice & IProviderSlice;

export const useStore = create<StoreState>()(
    devtools(
        persist(
            (...a) => ({
                ...userSlice(...a),
                ...applicationSlice(...a),
                ...providerSlice(...a),
            }),
            {
                name: 'global-store',
                partialize: (state) => ({ userData: state.userData }),
            }
        )
    )
);
