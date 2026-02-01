import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

interface AuthState {
    user: UserProfile | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    setSession: (user: UserProfile, token: string) => void;
    clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            setSession: (user, token) => set({ user, accessToken: token, isAuthenticated: true }),
            clearSession: () => set({ user: null, accessToken: null, isAuthenticated: false }),
        }),
        {
            name: 'vidpilot-auth-storage',
        }
    )
);
