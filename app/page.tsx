'use client';

import MarketCandle from '@/components/marketCandle';
import MarketList from '@/components/marketList';
import { useState } from 'react';

export default function Home() {
  // selectedSymbol은 추후에 Zustand로 옮겨 관리할 예정
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const handleSelectedMarket = (symbol: string) => {
    if (symbol === selectedSymbol) {
      // 이미 클릭한 종목을 한번 더 클릭하면 차트가 닫힘
      setSelectedSymbol(null);
    } else {
      setSelectedSymbol(symbol);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Market</h1>
      <div className="flex">
        <MarketList handleSelectedMarket={handleSelectedMarket} />
        {selectedSymbol !== null && <MarketCandle selectedSymbol={selectedSymbol} />}
      </div>
    </main>
  );
}
