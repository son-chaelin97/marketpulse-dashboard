import useFavoritesStore from './useFavoritesStore';

beforeEach(() => {
  useFavoritesStore.setState({ symbols: [] });
});

describe('useFavoritesStore', () => {
  describe('toggleFavorite', () => {
    it('심볼이 없을 때 호출하면 symbols에 추가된다', () => {
      const { getState } = useFavoritesStore;
      getState().toggleFavorite('BTCUSDT');

      expect(getState().symbols).toEqual(['BTCUSDT']);
    });

    it('같은 심볼을 다시 호출하면 symbols에서 제거된다', () => {
      const { getState } = useFavoritesStore;
      getState().toggleFavorite('BTCUSDT');
      getState().toggleFavorite('BTCUSDT');

      expect(getState().symbols).toEqual([]);
    });

    it('여러 심볼을 추가한 뒤 하나만 토글하면 해당 심볼만 제거된다', () => {
      const { getState } = useFavoritesStore;
      getState().toggleFavorite('BTCUSDT');
      getState().toggleFavorite('ETHUSDT');
      getState().toggleFavorite('SOLUSDT');
      getState().toggleFavorite('ETHUSDT');

      expect(getState().symbols).toEqual(['BTCUSDT', 'SOLUSDT']);
    });

    it('초기 symbols는 빈 배열이다', () => {
      expect(useFavoritesStore.getState().symbols).toEqual([]);
    });
  });
});
