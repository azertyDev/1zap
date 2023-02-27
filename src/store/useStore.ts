import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { userSlice, IUserSlice } from './slices/userSlice';

type IStoreState = IUserSlice;

export const useStore = create<IStoreState>()(
    devtools(
        persist(
            (...a) => ({
                ...userSlice(...a),
            }),
            {
                name: 'bound-store',
                partialize: (state) => ({ data: state.data }),
            }
        )
    )
);
