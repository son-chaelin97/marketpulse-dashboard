import { fetchMarkets } from '@/lib/api/binance';

export default async function Home() {
  const markets = await fetchMarkets(); // 실패하면 throw → error.tsx가 처리

  // 일단 확인용으로 20개만
  const top = markets.slice(0, 20);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Market</h1>
      <ul className="mt-4 space-y-2">
        {top.map((m) => (
          <li key={m.base} className="rounded-md border p-3">
            <div className="flex justify-between">
              <span className="font-medium">
                {m.base}/{m.quote}
              </span>
              <span>{m.lastPrice}</span>
            </div>
            <div className="mt-1 text-sm opacity-80">24h: {m.priceChangePercent}%</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
