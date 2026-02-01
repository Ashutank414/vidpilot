import { create } from 'zustand'

export type User = {
    id: string
    name: string
    email: string
    avatar: string
    channelName: string
    niche: string | null
}

interface AppState {
    user: User | null
    isAuthenticated: boolean
    dateRange: '7d' | '28d'

    login: (user: User) => void
    logout: () => void
    setDateRange: (range: '7d' | '28d') => void
    updateNiche: (niche: string) => void
}

export const useAppStore = create<AppState>((set) => ({
    user: null,
    isAuthenticated: false,
    dateRange: '28d',

    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
    setDateRange: (range) => set({ dateRange: range }),
    updateNiche: (niche) => set((state) => ({
        user: state.user ? { ...state.user, niche } : null
    }))
}))
