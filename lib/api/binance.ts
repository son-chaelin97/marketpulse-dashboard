import type { Binance24hrTicker, BinanceKline } from '@/types/binance';
import { Candle } from '@/types/chart';
import type { Market } from '@/types/market';

const BINANCE_24H_URL = 'https://api.binance.com/api/v3/ticker/24hr';
const QUOTE = 'USDT' as const;

function toNumber(value: string, fieldName: string): number {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    throw new Error(`Invalid number for ${fieldName}: "${value}"`);
  }
  return num;
}

function toMarket(item: Binance24hrTicker) {
  // 현재는 USDT 마켓만 지원
  const base = item.symbol.slice(0, -QUOTE.length);

  return {
    symbol: item.symbol,
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
  const response = await fetch(BINANCE_24H_URL);

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

const getDay = (openTime: number) => {
  const date = new Date(openTime).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  return date;
};

const fetchMarketCandles = async (symbol: string): Promise<Candle[]> => {
  const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=200`);

  if (!response.ok) {
    throw new Error(`Binance API failed: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  return json.map((item: BinanceKline) => ({
    day: getDay(item[0]),
    price: [toNumber(item[3], 'low'), toNumber(item[2], 'high')], // [가장 낮은 가격, 가장 높은 가격]
  }));
};

export { fetchMarketCandles, fetchMarkets };
