import { formatCompact, formatPrice } from '@/lib/format';
import { Market } from '@/types/market';

export default function MarketRow(market: Market) {
  const isUp = market.priceChangePercent > 0;
  return (
    <li key={`${market.base}-${market.quote}`} className="rounded-md border p-3">
      <div className="flex justify-between">
        <span className="font-medium">
          {market.base}/{market.quote}
        </span>
        <span className={`${isUp ? 'text-red-600' : 'text-blue-600'}`}>{formatPrice(market.lastPrice)}</span>
      </div>
      <div className="mt-1 text-sm opacity-80">
        24h change percent:{' '}
        <span className={`${isUp ? 'text-red-600' : 'text-blue-600'}`}>{market.priceChangePercent}%</span>
      </div>
      <div className="mt-1 text-sm opacity-80 hidden sm:block">
        24h hight/low price: {formatPrice(market.highPrice)}%/{formatPrice(market.lowPrice)}
      </div>
      <div className="mt-1 text-sm opacity-80 hidden sm:block">
        quote volume: {formatCompact.format(market.quoteVolume)}
      </div>
    </li>
  );
}
