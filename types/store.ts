export type FavoritesState = { symbols: string[] };

export type FavoritesStoreActions = {
  toggleFavorite: (symbol: string) => void;
};

export type FavoritesStore = FavoritesState & FavoritesStoreActions;
