import { Market, SortData, SortKey } from '@/types/market';
import { useState } from 'react';

const initialSortData: SortData = {
  quoteVolume: null,
  symbol: null,
  lastPrice: null,
  priceChangePercent: null,
};

const DEFAULT_MARKET_COUNT = 50;

export default function useMarketListView() {
  const [sortKey, setSortKey] = useState<SortKey>('quoteVolume');
  const [sortData, setSortData] = useState<SortData>(initialSortData);

  const handleSortChange = (key: keyof typeof sortData) => {
    const newSortData = { ...initialSortData, [key]: sortData[key] };
    let newSortDir = sortData[key];

    switch (sortData[key]) {
      case 'desc':
        newSortDir = 'asc';
        break;
      case 'asc':
        newSortDir = null;
        break;
      default:
        newSortDir = 'desc';
    }

    newSortData[key] = newSortDir;
    setSortData(newSortData);
    setSortKey(key);
  };

  const compareValue = (va: number | string, vb: number | string) => {
    // 정렬 해제 시 기본은 desc
    if (typeof va === 'string' && typeof vb === 'string') {
      return sortData[sortKey] === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    return sortData[sortKey] === 'asc' ? (va as number) - (vb as number) : (vb as number) - (va as number);
  };

  const getSortedMarkets = (markets: Market[]) => {
    return markets.toSorted((a, b) => compareValue(a[sortKey], b[sortKey])).slice(0, DEFAULT_MARKET_COUNT);
  };

  return { sortKey, handleSortChange, getSortedMarkets, sortData };
}
