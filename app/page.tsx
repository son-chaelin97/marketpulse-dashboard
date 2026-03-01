'use client';

import MarketCandle from '@/components/marketCandle';
import MarketList from '@/components/marketList';
import useBinanceSocket from '@/hooks/market/useBinanceSocket';
import useFavoritesStore from '@/store/useFavoritesStore';
import useMarketStore from '@/store/useMarketStore';
import { CoinFilterType } from '@/types/filter';
import { MoonIcon, SunIcon } from '@phosphor-icons/react/dist/ssr';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [coinFilter, setCoinFilter] = useState<CoinFilterType>('all');
  const isFavorite = useFavoritesStore((state) => state.symbols);
  const selectedMarket = useMarketStore((state) => state.selectedMarket);
  useBinanceSocket();

  return (
    <div className="min-h-screen relative lg:overflow-x-hidden overflow-y-hidden">
      <main className="pt-12 pb-12 pr-6 pl-6 mr-6 ml-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-linear-to-r text-transparent bg-clip-text w-fit from-(--color-grad-start) via-(--color-grad-via) to-(--color-grad-end)">
              암호화폐 시세
            </h1>
            <span className="text-lg text-muted-foreground">실시간 마켓 데이터 대시보드</span>
          </div>
          <button
            type="button"
            aria-label="테마 변경"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="glass-card border-0 px-2.5 py-2.5 text-base font-medium hover:bg-primary/20! cursor-pointer w-fit">
            {theme === 'dark' ? (
              // TODO: color 속성에 직접적으로 컬러를 넣지 않고 네이밍한 컬러를 넣을 수 있는지 알아보고 수정 (ex: text-slate-600)
              <SunIcon size={20} color="oklch(85.2% 0.199 91.936)" />
            ) : (
              <MoonIcon size={20} color="oklch(44.6% 0.043 257.281)" />
            )}
          </button>
        </div>
        <div className="flex gap-4 mt-12 w-max">
          <button
            type="button"
            aria-label="모든 코인 보기"
            className="glass-card border-0 px-4 py-2 font-bold cursor-pointer bg-primary/20! text-primary text-sm"
            aria-pressed={coinFilter === 'all'}
            onClick={() => setCoinFilter('all')}>
            모든 코인 보기
          </button>
          <button
            type="button"
            aria-label="관심 코인 보기"
            className="glass-card border-0 px-4 py-2 font-bold flex items-center gap-2 cursor-pointer bg-primary! text-white text-sm"
            aria-pressed={coinFilter === 'favorite'}
            onClick={() => setCoinFilter('favorite')}>
            관심 코인 보기({isFavorite.length})
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <MarketList coinFilter={coinFilter} />
          </div>
          <div className="lg:col-span-1">
            {selectedMarket === null ? (
              <div className="glass-card p-8 text-center flex flex-col items-center justify-center h-100">
                <p className="text-lg text-muted-foreground mb-2">코인을 선택하세요</p>
                <p className="text-sm text-muted-foreground">
                  테이블에서 코인을 클릭하면 일봉 차트를 확인할 수 있습니다
                </p>
              </div>
            ) : (
              <MarketCandle selectedMarket={selectedMarket} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
