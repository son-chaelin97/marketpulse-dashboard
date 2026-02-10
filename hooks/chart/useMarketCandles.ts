import { fetchMarketCandles } from '@/lib/api/binance';
import { useQuery } from '@tanstack/react-query';

export default function useMarketCandles(symbol: string) {
  const { data, isPending, error } = useQuery({
    queryKey: ['market-candles', symbol],
    queryFn: () => fetchMarketCandles(symbol),
    enabled: !!symbol,
    placeholderData: (previousData) => previousData,
  });

  return { candles: data ?? [], isPending, error };
}
