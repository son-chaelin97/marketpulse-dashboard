import { Market } from './market';

// --- useFavoritesStore.ts ---
export type FavoritesState = { symbols: string[] };

export type FavoritesStoreActions = {
  toggleFavorite: (symbol: string) => void;
};

export type FavoritesStore = FavoritesState & FavoritesStoreActions;

// --- useTheme.ts ---
export type ThemeState = { theme: 'light' | 'dark' };

export type ThemeStoreActions = {
  toggleTheme: () => void;
};

export type ThemeStore = ThemeState & ThemeStoreActions;

// --- useMarketStore.ts ---
export type SelectedMarketState = { selectedMarket: Market | null };

export type MarketStoreActions = {
  toggleMarket: (market: Market) => void;
  closeMarket: () => void;
};

export type MarketStore = SelectedMarketState & MarketStoreActions;
