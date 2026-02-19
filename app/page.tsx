'use client';

import MarketCandle from '@/components/marketCandle';
import MarketList from '@/components/marketList';
import useFavoritesStore from '@/store/useFavoritesStore';
import { CoinFilterType } from '@/types/filter';
import { useState } from 'react';

export default function Home() {
  // selectedSymbol은 추후에 Zustand로 옮겨 관리할 예정
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [coinFilter, setCoinFilter] = useState<CoinFilterType>('all');
  const isFavorite = useFavoritesStore((state) => state.symbols);

  const handleSelectedMarket = (symbol: string) => {
    if (symbol === selectedSymbol) {
      // 이미 클릭한 종목을 한번 더 클릭하면 차트가 닫힘
      setSelectedSymbol(null);
    } else {
      setSelectedSymbol(symbol);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className={`fixed inset-0 -z-10 block min-h-screen bg-[url('/images/light-mode-bg.png')]`} />
      <main className="pt-12 pb-12 pr-6 pl-6 mr-6 ml-6">
        <h1 className="font-bold text-6xl text-transparent bg-linear-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text mb-3">
          암호화폐 시세
        </h1>
        <span className="text-lg text-muted-foreground">실시간 마켓 데이터 대시보드</span>
        <div className="flex gap-4 mt-12">
          <button
            type="button"
            className="glass-card border-0 px-5 py-3 font-bold cursor-pointer bg-primary/20! text-primary text-sm"
            aria-pressed={coinFilter === 'all'}
            onClick={() => setCoinFilter('all')}>
            모든 코인 보기
          </button>
          <button
            type="button"
            className="glass-card border-0 px-5 py-3 font-bold flex items-center gap-2 cursor-pointer bg-primary! text-white text-sm"
            aria-pressed={coinFilter === 'favorite'}
            onClick={() => setCoinFilter('favorite')}>
            관심 코인 보기({isFavorite.length})
          </button>
        </div>
        <div className="flex mt-8">
          <MarketList handleSelectedMarket={handleSelectedMarket} coinFilter={coinFilter} />
          {selectedSymbol !== null && <MarketCandle selectedSymbol={selectedSymbol} />}
        </div>
      </main>
    </div>
  );
}
