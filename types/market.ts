export interface Market {
  symbol: string;
  base: string;
  quote: 'USDT';
  priceChangePercent: number;
  lastPrice: number;
  highPrice: number;
  lowPrice: number;
  quoteVolume: number;
}
