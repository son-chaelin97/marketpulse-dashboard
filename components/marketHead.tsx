import { SortData, SortDir, SortKey } from '@/types/market';
import { ArrowDownIcon, ArrowsDownUpIcon, ArrowUpIcon } from '@phosphor-icons/react';

function SortIcon({ sortDir }: { sortDir: SortDir }) {
  if (sortDir === 'asc') return <ArrowUpIcon size={18} />;
  if (sortDir === 'desc') return <ArrowDownIcon size={18} />;
  return <ArrowsDownUpIcon size={18} />;
}

export default function MarketHead({
  handleSortChange,
  sortData,
}: {
  handleSortChange: (key: SortKey) => void;
  sortData: SortData;
}) {
  return (
    <thead>
      <tr className="border-b border-border/50">
        <th className="px-6 py-4">
          <button
            type="button"
            className="flex items-center cursor-pointer text-sm font-semibold text-muted-foreground uppercase tracking-wide"
            onClick={() => handleSortChange('symbol')}>
            Market
            <SortIcon sortDir={sortData.symbol} />
          </button>
        </th>
        <th className="px-6 py-4">
          <button
            type="button"
            className="flex items-center cursor-pointer text-sm font-semibold text-muted-foreground uppercase tracking-wide"
            onClick={() => handleSortChange('lastPrice')}>
            Price
            <SortIcon sortDir={sortData.lastPrice} />
          </button>
        </th>
        <th className="px-6 py-4">
          <button
            type="button"
            className="flex items-center cursor-pointer text-sm font-semibold text-muted-foreground uppercase tracking-wide"
            onClick={() => handleSortChange('priceChangePercent')}>
            24h
            <SortIcon sortDir={sortData.priceChangePercent} />
          </button>
        </th>
        <th className="px-6 py-4 hidden sm:table-cell">
          <button
            type="button"
            className="flex items-center cursor-pointer text-sm font-semibold text-muted-foreground uppercase tracking-wide"
            onClick={() => handleSortChange('quoteVolume')}>
            Volume
            <SortIcon sortDir={sortData.quoteVolume} />
          </button>
        </th>
      </tr>
    </thead>
  );
}
