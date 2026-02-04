import MarketList from '@/components/marketList';
import { fetchMarkets } from '@/lib/api/binance';

export default async function Home() {
  const markets = await fetchMarkets(); // 실패하면 throw → error.tsx가 처리

  // 상위 오십개만 거래대금순 내림차순으로 정렬
  const top = markets.toSorted((a, b) => b.quoteVolume - a.quoteVolume).slice(0, 50);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Market</h1>
      <MarketList markets={top} />
    </main>
  );
}
