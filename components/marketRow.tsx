'use client';

import { formatCompact, formatPrice } from '@/lib/format';
import { Market } from '@/types/market';
import React from 'react';

function MarketRow({
  market,
  handleSelectedMarket,
}: {
  market: Market;
  handleSelectedMarket: (symbol: string) => void;
}) {
  const isUp = market.priceChangePercent > 0;

  const onKeyDown: React.KeyboardEventHandler<HTMLTableRowElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectedMarket(market.symbol);
    }
  };

  return (
    <tr
      className="align-baseline cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={() => handleSelectedMarket(market.symbol)}>
      <td className="px-6 py-4 w-50 max-w-50">
        <span className="font-bold">
          {market.base}/{market.quote}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`${isUp ? 'text-red-600' : 'text-blue-600'} font-bold`}>{formatPrice(market.lastPrice)}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`${isUp ? 'text-red-600' : 'text-blue-600'} block font-bold`}>
          {market.priceChangePercent}%
        </span>
        <span className="block text-xs text-gray-500">
          24h H/L: {formatPrice(market.highPrice)} / {formatPrice(market.lowPrice)}
        </span>
      </td>
      <td className="hidden sm:table-cell px-6 py-4 w-20 max-w-20">{formatCompact.format(market.quoteVolume)}</td>
    </tr>
  );
}

export default React.memo(MarketRow);
