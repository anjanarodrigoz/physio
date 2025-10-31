import { create } from 'zustand'

interface UIState {
  theme: 'light' | 'dark'
  language: 'en' | 'si' | 'ta'
  sidebarOpen: boolean
  toggleTheme: () => void
  setLanguage: (lang: 'en' | 'si' | 'ta') => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  language: 'en',
  sidebarOpen: false,
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setLanguage: (lang) => set({ language: lang }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
