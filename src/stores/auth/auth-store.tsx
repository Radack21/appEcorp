import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface AuthState {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

const storeAuth: StateCreator<AuthState> = (set) => ({
    isAuth: false,
    setIsAuth: (isAuth) => set({ isAuth }),
});

export const useAuthStore = create<AuthState>()(
    persist (
        storeAuth,
        { 
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)