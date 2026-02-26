import { QUOTE } from '@/constants/market';
import { MARKETS_QUERY_KEY } from '@/constants/queryKeys';
import { toNumber } from '@/lib/utils';
import { Binance24hrTicker_WS } from '@/types/binance';
import { Market, MarketPatch } from '@/types/market';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function useBinanceSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const tickerMap: Record<string, MarketPatch> = {};
    let socket: WebSocket | null = null;
    let reconnectTimer: number | null = null;

    const connect = () => {
      socket = new WebSocket('wss://stream.testnet.binance.vision/ws/!ticker@arr');

      socket.onmessage = (event) => {
        const data: Binance24hrTicker_WS[] = JSON.parse(event.data);

        data
          // USDT(현재시세)만 가져오도록 함
          .filter((item) => item.s.endsWith(QUOTE))
          // 데이터를 본래 데이터에 넣기 편한 구조와 타입으로 변환
          .forEach((item) => {
            tickerMap[item.s] = {
              symbol: item.s,
              priceChangePercent: toNumber(item.P, 'priceChangePercent'),
              lastPrice: toNumber(item.c, 'lastPrice'),
              highPrice: toNumber(item.h, 'highPrice'),
              lowPrice: toNumber(item.l, 'lowPrice'),
              quoteVolume: toNumber(item.q, 'quoteVolume'),
            };
          });

        queryClient.setQueryData([MARKETS_QUERY_KEY], (old: Market[] | undefined) => {
          if (!old) return old;
          // 이전 데이터에 업데이트 된 데이터가 있으면 새 데이터로 대치함
          return old.map((item) => {
            if (tickerMap[item.symbol]) {
              return { ...item, ...tickerMap[item.symbol] };
            }
            return item;
          });
        });
      };

      socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
        socket?.close(); // 에러시 소켓 닫음
      };

      socket.onclose = () => {
        //약간 딜레이 후 재연결
        reconnectTimer = window.setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      if (reconnectTimer) window.clearTimeout(reconnectTimer);
      socket?.close();
    };
  }, [queryClient]);
}
