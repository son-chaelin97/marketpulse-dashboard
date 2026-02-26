import { fetchMarketCandles } from '@/lib/api/binance';
import { useQuery } from '@tanstack/react-query';

const CANDLES_QUERY_KEY = 'market-candles' as const;

export default function useMarketCandles(symbol: string) {
  const { data, isPending, error } = useQuery({
    queryKey: [CANDLES_QUERY_KEY, symbol],
    queryFn: () => fetchMarketCandles(symbol),
    enabled: !!symbol,
    placeholderData: (previousData) => previousData,
  });

  return { candles: data ?? [], isPending, error };
}
