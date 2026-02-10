'use client';

import useMarketListView from '@/hooks/market/useMarketListView';
import useMarkets from '@/hooks/market/useMarkets';
import EmptyState from './emptyState';
import MarketHead from './marketHead';
import MarketRow from './marketRow';

export default function MarketList({ handleSelectedMarket }: { handleSelectedMarket: (symbol: string) => void }) {
  const { isPending, error, markets } = useMarkets();
  const { getSortedMarkets, handleSortChange, sortData } = useMarketListView();

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (markets.length === 0) {
    return <EmptyState message="No markets available" />;
  }

  return (
    <table className="table-auto w-5xl">
      <MarketHead handleSortChange={handleSortChange} sortData={sortData} />
      <tbody>
        {getSortedMarkets(markets).map((market) => (
          <MarketRow key={market.symbol} market={market} handleSelectedMarket={handleSelectedMarket} />
        ))}
      </tbody>
    </table>
  );
}
