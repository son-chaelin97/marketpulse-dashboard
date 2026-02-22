'use client';

import MarketCandle from '@/components/marketCandle';
import MarketList from '@/components/marketList';
import useFavoritesStore from '@/store/useFavoritesStore';
import useTheme from '@/store/useTheme';
import { CoinFilterType } from '@/types/filter';
import { MoonIcon, SunIcon } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

export default function Home() {
  // selectedSymbol은 추후에 Zustand로 옮겨 관리할 예정
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [coinFilter, setCoinFilter] = useState<CoinFilterType>('all');
  const isFavorite = useFavoritesStore((state) => state.symbols);
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

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
      <main className="pt-12 pb-12 pr-6 pl-6 mr-6 ml-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-linear-to-r text-transparent bg-clip-text w-fit from-slate-800 via-blue-700 to-purple-700 dark:from-white dark:via-purple-300 dark:to-cyan-300">
              암호화폐 시세
            </h1>
            <span className="text-lg text-muted-foreground">실시간 마켓 데이터 대시보드</span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="glass-card border-0 px-2.5 py-2.5 text-base font-medium hover:bg-primary/20! cursor-pointer">
            {theme === 'dark' ? (
              // TODO: color 속성에 직접적으로 컬러를 넣지 않고 네이밍한 컬러를 넣을 수 있는지 알아보고 수정 (ex: text-slate-600)
              <SunIcon size={20} color="oklch(85.2% 0.199 91.936)" />
            ) : (
              <MoonIcon size={20} color="oklch(44.6% 0.043 257.281)" />
            )}
          </button>
        </div>
        <div className="flex gap-4 mt-12">
          <button
            type="button"
            className="glass-card border-0 px-4 py-2 font-bold cursor-pointer bg-primary/20! text-primary text-sm"
            aria-pressed={coinFilter === 'all'}
            onClick={() => setCoinFilter('all')}>
            모든 코인 보기
          </button>
          <button
            type="button"
            className="glass-card border-0 px-4 py-2 font-bold flex items-center gap-2 cursor-pointer bg-primary! text-white text-sm"
            aria-pressed={coinFilter === 'favorite'}
            onClick={() => setCoinFilter('favorite')}>
            관심 코인 보기({isFavorite.length})
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <MarketList handleSelectedMarket={handleSelectedMarket} coinFilter={coinFilter} />
          </div>
          <div className="lg:col-span-1">
            {selectedSymbol !== null && <MarketCandle selectedSymbol={selectedSymbol} />}
          </div>
        </div>
      </main>
    </div>
  );
}
