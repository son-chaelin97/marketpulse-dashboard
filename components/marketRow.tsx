'use client';

import { formatCompact, formatPrice } from '@/lib/format';
import { Market } from '@/types/market';
import React from 'react';

function MarketRow({ market }: { market: Market }) {
  const isUp = market.priceChangePercent > 0;
  return (
    <tr className="align-baseline border-solid border-black border">
      <td className="px-4 min-w-3xs">
        <span className="font-bold">
          {market.base}/{market.quote}
        </span>
      </td>
      <td className="px-4 min-w-3xs">
        <span className={`${isUp ? 'text-red-600' : 'text-blue-600'} font-bold`}>{formatPrice(market.lastPrice)}</span>
      </td>
      <td className="px-4 min-w-xs">
        <span className={`${isUp ? 'text-red-600' : 'text-blue-600'} block font-bold`}>
          {market.priceChangePercent}%
        </span>
        <span className="block text-xs text-gray-500">
          24h H/L: {formatPrice(market.highPrice)} / {formatPrice(market.lowPrice)}
        </span>
      </td>
      <td className="hidden sm:table-cell px-4">{formatCompact.format(market.quoteVolume)}</td>
    </tr>
  );
}

export default React.memo(MarketRow);
