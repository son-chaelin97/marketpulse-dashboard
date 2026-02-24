'use client';

import { formatCompact, formatPrice } from '@/lib/format';
import useFavoritesStore from '@/store/useFavoritesStore';
import useMarketStore from '@/store/useMarketStore';
import { Market } from '@/types/market';
import { StarIcon, TrendDownIcon, TrendUpIcon } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

function MarketRow({ market }: { market: Market }) {
  const isFavorite = useFavoritesStore((state) => state.symbols);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const toggleMarket = useMarketStore((state) => state.toggleMarket);
  const isUp = market.priceChangePercent > 0;

  const onKeyDown: React.KeyboardEventHandler<HTMLTableRowElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMarket(market);
    }
  };

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    toggleFavorite(market.symbol);
  };

  return (
    <tr
      className="align-baseline border-b border-border/50 hover:bg-primary/5 cursor-pointer transition-colors duration-200"
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={() => toggleMarket(market)}>
      <td className="px-6 py-4 w-30 max-w-30 align-middle">
        <button
          type="button"
          className="p-2 rounded-full h-9 cursor-pointer hover:bg-primary/20 transition-colors duration-200"
          onClick={handleToggleFavorite}
          aria-label={isFavorite.includes(market.symbol) ? '관심 목록에서 제거' : '관심 목록에 추가'}>
          {isFavorite.includes(market.symbol) ? (
            <StarIcon size={20} weight="fill" color="oklch(0.65 0.25 300)" />
          ) : (
            <StarIcon size={20} weight="light" color="oklch(0.7 0.03 280)" />
          )}
        </button>
      </td>
      <td className="px-6 py-4 w-50 max-w-50 align-middle">
        <span className="font-bold">{market.base}</span>
      </td>
      <td className="px-6 py-4 align-middle">
        <span className={`${isUp ? 'text-(--color-chart-1)' : 'text-(--color-chart-2)'} font-bold`}>
          {formatPrice(market.lastPrice)}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-4xl ${isUp ? 'bg-chart-1/20' : 'bg-chart-2/20'}`}>
            {isUp ? (
              <TrendUpIcon size={16} weight="bold" fill="oklch(0.75 0.18 160)" />
            ) : (
              <TrendDownIcon size={16} weight="bold" fill="oklch(0.7 0.2 25)" />
            )}
          </div>
          <div>
            <span className={`${isUp ? 'text-(--color-chart-1)' : 'text-(--color-chart-2)'} block font-bold`}>
              {market.priceChangePercent}%
            </span>
            <span className="block text-xs text-muted-foreground align-middle">
              24h H/L: {formatPrice(market.highPrice)} / {formatPrice(market.lowPrice)}
            </span>
          </div>
        </div>
      </td>
      <td className="hidden sm:table-cell px-6 py-4 w-40 max-w-40 align-middle font-bold">
        {formatCompact.format(market.quoteVolume)}
      </td>
    </tr>
  );
}

export default React.memo(MarketRow);
