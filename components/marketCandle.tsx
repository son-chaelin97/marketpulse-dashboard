'use client';

import useMarketCandles from '@/hooks/chart/useMarketCandles';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

export default function MarketCandle({ selectedSymbol }: { selectedSymbol: string }) {
  const { candles, isPending, error } = useMarketCandles(selectedSymbol);

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (candles.length === 0) return <div>No candles found</div>;

  return (
    <div className="min-w-0 flex-1">
      <BarChart
        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
        responsive
        data={candles}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}>
        <XAxis dataKey="day" interval="preserveStartEnd" />
        <YAxis width="auto" />
        <Bar dataKey="price" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
