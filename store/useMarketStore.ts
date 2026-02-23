import { MarketStore } from '@/types/store';
import { create } from 'zustand';

const useMarketStore = create<MarketStore>((set) => ({
  selectedMarket: null,
  toggleMarket: (market) =>
    set((state) => {
      if (market.symbol === state.selectedMarket?.symbol) {
        // 이미 클릭한 종목을 한번 더 클릭하면 차트가 닫힘
        return { selectedMarket: null };
      } else {
        return { selectedMarket: market };
      }
    }),
  closeMarket: () =>
    set(() => {
      return { selectedMarket: null };
    }),
}));

export default useMarketStore;
