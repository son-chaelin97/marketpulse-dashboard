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

export type SortKey = 'quoteVolume' | 'symbol' | 'lastPrice' | 'priceChangePercent';
export type SortDir = 'asc' | 'desc' | null;
export interface SortData {
  quoteVolume: SortDir;
  symbol: SortDir;
  lastPrice: SortDir;
  priceChangePercent: SortDir;
}
