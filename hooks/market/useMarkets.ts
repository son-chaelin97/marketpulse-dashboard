import { MARKETS_QUERY_KEY } from '@/constants/queryKeys';
import { fetchMarkets } from '@/lib/api/binance';
import { Market } from '@/types/market';
import { useQuery } from '@tanstack/react-query';

export default function useMarkets() {
  const { data, isPending, error } = useQuery<Market[], Error, Market[]>({
    queryKey: [MARKETS_QUERY_KEY],
    queryFn: fetchMarkets,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return { markets: data ?? [], isPending, error };
}
