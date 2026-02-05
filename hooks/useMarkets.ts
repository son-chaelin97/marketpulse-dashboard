import { fetchMarkets } from '@/lib/api/binance';
import { Market } from '@/types/market';
import { useQuery } from '@tanstack/react-query';

const MARKETS_QUERY_KEY = ['markets'] as const;

const DEFAULT_MARKETS_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  staleTime: 5000,
} as const;

export default function useMarkets() {
  const { data, isPending, error } = useQuery<Market[], Error, Market[]>({
    queryKey: MARKETS_QUERY_KEY,
    queryFn: fetchMarkets,
    refetchInterval: 5000,
    select: (list) => list.toSorted((a, b) => b.quoteVolume - a.quoteVolume).slice(0, 50), // 상위 오십개만 거래대금순 내림차순으로 정렬
    ...DEFAULT_MARKETS_QUERY_OPTIONS,
  });

  return { markets: data ?? [], isPending, error };
}
