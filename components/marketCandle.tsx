'use client';

import useMarketCandles from '@/hooks/chart/useMarketCandles';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function MarketCandle({ selectedSymbol }: { selectedSymbol: string }) {
  const { candles, isPending, error } = useMarketCandles(selectedSymbol);

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (candles.length === 0) return <div>No candles found</div>;

  return (
    <div className="flex flex-col h-full glass-card p-6">
      <div className="flex-1 w-full min-h-300px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={candles}
            margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
            <XAxis dataKey="day" interval="preserveStartEnd" />
            <YAxis width="auto" />
            <Bar dataKey="price" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
