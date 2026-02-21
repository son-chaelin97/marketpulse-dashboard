import { ThemeStore } from '@/types/store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
          return { theme: newTheme };
        }),
    }),
    {
      name: 'marketpulse-theme',
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        if (!state) return;
        document.documentElement.classList.toggle('dark', state.theme === 'dark');
      },
    },
  ),
);

export default useTheme;
