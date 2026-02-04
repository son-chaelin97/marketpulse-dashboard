import type { Binance24hrTicker } from '@/types/binance';
import type { Market } from '@/types/market';

const BINANCE_24H_URL = 'https://api.binance.com/api/v3/ticker/24hr';
const QUOTE = 'USDT' as const;

function toNumber(value: string, fieldName: string): number {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    throw new Error(`Invalid number for ${fieldName}: "${value}"`);
  }
  return n;
}

function toMarket(item: Binance24hrTicker) {
  // 현재는 USDT 마켓만 지원
  const base = item.symbol.slice(0, -QUOTE.length);

  return {
    base,
    quote: QUOTE,
    lastPrice: toNumber(item.lastPrice, 'lastPrice'),
    priceChangePercent: toNumber(item.priceChangePercent, 'priceChangePercent'),
    highPrice: toNumber(item.highPrice, 'highPrice'),
    lowPrice: toNumber(item.lowPrice, 'lowPrice'),
    quoteVolume: toNumber(item.quoteVolume, 'quoteVolume'),
  };
}

const fetchMarkets = async (): Promise<Market[]> => {
  const response = await fetch(BINANCE_24H_URL, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Binance API failed: ${response.status} ${response.statusText}`);
  }

  const json: Binance24hrTicker[] = await response.json();

  // 순회하면서 조건을 만족하는 것만 새 배열로 생성
  return (
    json
      // USDT(현재시세)만 가져오도록 함
      .filter((item) => item.symbol.endsWith(QUOTE))
      // 데이터를 사용하기 편한 구조와 타입으로 변환
      .map(toMarket)
  );
};

export { fetchMarkets };
