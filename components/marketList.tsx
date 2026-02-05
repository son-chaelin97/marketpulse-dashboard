'use client';

import useMarkets from '@/hooks/useMarkets';
import EmptyState from './emptyState';
import MarketRow from './marketRow';

export default function MarketList() {
  const { isPending, error, markets } = useMarkets();

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (markets.length === 0) {
    return <EmptyState message="No markets available" />;
  }

  return (
    <ul className="mt-4 space-y-2">
      {markets.map((market) => (
        <MarketRow key={market.symbol} market={market} />
      ))}
    </ul>
  );
}
