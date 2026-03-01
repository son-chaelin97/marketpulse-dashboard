import { renderHook, act } from '@testing-library/react';
import useMarketListView from './useMarketListView';
import { Market } from '@/types/market';

const createMockMarket = (overrides: Partial<Market>): Market => ({
  symbol: 'BTCUSDT',
  base: 'BTC',
  quote: 'USDT',
  priceChangePercent: 0,
  lastPrice: 0,
  highPrice: 0,
  lowPrice: 0,
  quoteVolume: 0,
  ...overrides,
});

describe('useMarketListView', () => {
  describe('초기 상태', () => {
    it('sortKey는 quoteVolume, sortData는 모두 null이다', () => {
      const { result } = renderHook(() => useMarketListView());

      expect(result.current.sortKey).toBe('quoteVolume');
      expect(result.current.sortData).toEqual({
        quoteVolume: null,
        symbol: null,
        lastPrice: null,
        priceChangePercent: null,
      });
    });
  });

  describe('handleSortChange', () => {
    it('한 번 호출하면 해당 키가 desc가 된다', () => {
      const { result } = renderHook(() => useMarketListView());

      act(() => {
        result.current.handleSortChange('lastPrice');
      });

      expect(result.current.sortKey).toBe('lastPrice');
      expect(result.current.sortData.lastPrice).toBe('desc');
    });

    it('같은 키를 두 번 호출하면 asc가 된다', () => {
      const { result } = renderHook(() => useMarketListView());

      act(() => {
        result.current.handleSortChange('symbol');
      });
      act(() => {
        result.current.handleSortChange('symbol');
      });

      expect(result.current.sortData.symbol).toBe('asc');
    });

    it('같은 키를 세 번 호출하면 null이 된다', () => {
      const { result } = renderHook(() => useMarketListView());

      act(() => {
        result.current.handleSortChange('priceChangePercent');
      });
      act(() => {
        result.current.handleSortChange('priceChangePercent');
      });
      act(() => {
        result.current.handleSortChange('priceChangePercent');
      });

      expect(result.current.sortData.priceChangePercent).toBe(null);
    });

    it('다른 키로 변경하면 이전 키만 초기화되고 새 키가 활성화된다', () => {
      const { result } = renderHook(() => useMarketListView());

      act(() => {
        result.current.handleSortChange('lastPrice');
      });
      act(() => {
        result.current.handleSortChange('quoteVolume');
      });

      expect(result.current.sortKey).toBe('quoteVolume');
      expect(result.current.sortData.lastPrice).toBe(null);
      expect(result.current.sortData.quoteVolume).toBe('desc');
    });
  });

  describe('getSortedMarkets', () => {
    const markets: Market[] = [
      createMockMarket({ symbol: 'BTCUSDT', base: 'BTC', lastPrice: 100, quoteVolume: 1000 }),
      createMockMarket({ symbol: 'ETHUSDT', base: 'ETH', lastPrice: 50, quoteVolume: 500 }),
      createMockMarket({ symbol: 'SOLUSDT', base: 'SOL', lastPrice: 200, quoteVolume: 2000 }),
    ];

    it('sortKey 기준으로 오름차순 정렬된다 (asc)', () => {
      const { result } = renderHook(() => useMarketListView());

      act(() => {
        result.current.handleSortChange('lastPrice');
      });
      act(() => {
        result.current.handleSortChange('lastPrice');
      });

      const sorted = result.current.getSortedMarkets(markets);
      expect(sorted.map((m) => m.lastPrice)).toEqual([50, 100, 200]);
    });

    it('sortKey 기준으로 내림차순 정렬된다 (desc)', () => {
      const { result } = renderHook(() => useMarketListView());

      act(() => {
        result.current.handleSortChange('quoteVolume');
      });

      const sorted = result.current.getSortedMarkets(markets);
      expect(sorted.map((m) => m.quoteVolume)).toEqual([2000, 1000, 500]);
    });

    it('최대 50개만 반환한다', () => {
      const { result } = renderHook(() => useMarketListView());
      const many = Array.from({ length: 60 }, (_, i) =>
        createMockMarket({ symbol: `M${i}USDT`, base: `M${i}`, quoteVolume: i }),
      );

      const sorted = result.current.getSortedMarkets(many);
      expect(sorted).toHaveLength(50);
    });

    it('symbol(문자열) 기준 정렬 시 desc는 역알파벳, asc는 알파벳 순이다', () => {
      const { result } = renderHook(() => useMarketListView());

      act(() => {
        result.current.handleSortChange('symbol');
      });
      const descSorted = result.current.getSortedMarkets(markets);
      expect(descSorted.map((m) => m.symbol)).toEqual(['SOLUSDT', 'ETHUSDT', 'BTCUSDT']);

      act(() => {
        result.current.handleSortChange('symbol');
      });
      const ascSorted = result.current.getSortedMarkets(markets);
      expect(ascSorted.map((m) => m.symbol)).toEqual(['BTCUSDT', 'ETHUSDT', 'SOLUSDT']);
    });
  });
});
