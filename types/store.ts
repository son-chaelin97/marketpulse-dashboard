export type FavoritesState = { symbols: string[] };

export type FavoritesStoreActions = {
  toggleFavorite: (symbol: string) => void;
};

export type FavoritesStore = FavoritesState & FavoritesStoreActions;

export type ThemeState = { theme: 'light' | 'dark' };

export type ThemeStoreActions = {
  toggleTheme: () => void;
};

export type ThemeStore = ThemeState & ThemeStoreActions;
