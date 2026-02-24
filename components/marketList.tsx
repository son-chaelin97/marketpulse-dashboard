'use client';

import useMarketListView from '@/hooks/market/useMarketListView';
import useMarkets from '@/hooks/market/useMarkets';
import useFavoritesStore from '@/store/useFavoritesStore';
import { CoinFilterType } from '@/types/filter';
import { EmptyMarketList } from './emptyState';
import MarketHead from './marketHead';
import MarketRow from './marketRow';
import { TableSkeleton } from './skeleton';

export default function MarketList({ coinFilter }: { coinFilter: CoinFilterType }) {
  const { isPending, error, markets } = useMarkets();
  const { getSortedMarkets, handleSortChange, sortData } = useMarketListView();
  const isFavorite = useFavoritesStore((state) => state.symbols);

  if (isPending) return <TableSkeleton />;

  if (error) return <div>{error.message}</div>;

  if (markets.length === 0) {
    return <EmptyMarketList />;
  }

  return (
    <table className="table-auto w-full glass-card">
      <MarketHead handleSortChange={handleSortChange} sortData={sortData} />
      <tbody>
        {getSortedMarkets(
          coinFilter === 'favorite' ? markets.filter((data) => isFavorite.includes(data.symbol)) : markets,
        ).map((market) => (
          <MarketRow key={market.symbol} market={market} />
        ))}
      </tbody>
    </table>
  );
}
