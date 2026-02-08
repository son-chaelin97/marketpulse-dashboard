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
    <thead className="border border-black border-solid">
      <tr>
        <th className="px-4">
          <button type="button" className="flex items-center cursor-pointer" onClick={() => handleSortChange('symbol')}>
            Market
            <SortIcon sortDir={sortData.symbol} />
          </button>
        </th>
        <th className="px-4">
          <button
            type="button"
            className="flex items-center justify-end cursor-pointer"
            onClick={() => handleSortChange('lastPrice')}>
            Price
            <SortIcon sortDir={sortData.lastPrice} />
          </button>
        </th>
        <th className="px-4">
          <button
            type="button"
            className="flex items-center cursor-pointer"
            onClick={() => handleSortChange('priceChangePercent')}>
            24h
            <SortIcon sortDir={sortData.priceChangePercent} />
          </button>
        </th>
        <th className="px-4 hidden sm:table-cell">
          <button
            type="button"
            className="flex items-center cursor-pointer"
            onClick={() => handleSortChange('quoteVolume')}>
            Volume
            <SortIcon sortDir={sortData.quoteVolume} />
          </button>
        </th>
      </tr>
    </thead>
  );
}
