import { FavoritesStore } from '@/types/store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      symbols: [],
      toggleFavorite: (symbol) =>
        set((state) => {
          const exist = state.symbols.includes(symbol);

          return {
            symbols: exist ? state.symbols.filter((s) => s !== symbol) : [...state.symbols, symbol],
          };
        }),
    }),
    { name: 'favorite-market-storage' },
  ),
);

export default useFavoritesStore;
