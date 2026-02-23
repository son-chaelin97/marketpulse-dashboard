'use client';

import Loading from '@/app/loading';
import useMarketCandles from '@/hooks/chart/useMarketCandles';
import { formatPrice } from '@/lib/format';
import useMarketStore from '@/store/useMarketStore';
import { Market } from '@/types/market';
import { XIcon } from '@phosphor-icons/react/dist/ssr';
import { CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';

export default function MarketCandle({ selectedMarket }: { selectedMarket: Market }) {
  const { candles, isPending, error } = useMarketCandles(selectedMarket.symbol);
  const closeMarket = useMarketStore((state) => state.closeMarket);

  if (isPending) return <Loading />;

  if (error)
    return (
      <div className="flex items-center justify-center p-12 text-destructive" role="alert">
        <p>차트 데이터를 불러오는데 실패했습니다.</p>
      </div>
    );

  const highestPrice = Math.max(...candles.map((c) => c.high));
  const lowestPrice = Math.min(...candles.map((c) => c.low));

  return (
    <div className="glass-card p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">
            {selectedMarket.base}/{selectedMarket.quote}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{selectedMarket.base} · 최근 30일 일봉</p>
        </div>
        <button type="button" className="cursor-pointer" onClick={closeMarket} aria-label="차트 닫기">
          <XIcon size={16} weight="bold" />
        </button>
      </div>
      <div className="flex-1 w-full min-h-fit">
        {candles.length === 0 ? (
          <div>
            <span>코인을 선택하세요</span>
            <span>테이블에서 코인을 클릭하면 일봉 차트를 확인할 수 있습니다</span>
          </div>
        ) : (
          <ComposedChart
            barGap={-5}
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={candles}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
            <XAxis
              dataKey="date"
              interval="preserveStartEnd"
              stroke="oklch(0.7 0.03 280)"
              tick={{ fontSize: 12, fill: 'oklch(0.7 0.03 280)', fontFamily: 'Outfit, sans-serif' }}
            />
            <YAxis
              domain={['auto', 'auto']}
              width="auto"
              stroke="oklch(0.7 0.03 280)"
              tick={{ fontSize: 12, fill: 'oklch(0.7 0.03 280)', fontFamily: 'Outfit, sans-serif' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(0.2 0.06 260)',
                border: '1px solid oklch(1 0 0 / 0.12)',
                borderRadius: '0.75rem',
                color: 'oklch(0.95 0.01 280)',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '12px',
              }}
              formatter={(value: number | undefined) => `$${formatPrice(value ?? 0)}`}
              labelStyle={{ color: 'oklch(0.95 0.01 280)' }}
            />
            <Legend
              wrapperStyle={{
                fontFamily: 'Outfit, sans-serif',
                color: 'oklch(0.7 0.03 280)',
                fontSize: '12px',
              }}
            />

            {/* 1. 고가 라인 차트 */}
            <Line
              type="monotone"
              dataKey="high"
              stroke="var(--color-chart-1)"
              strokeDasharray="5 5"
              dot={false}
              name="고가"
            />

            {/* 2. 저가 라인 차트 */}
            <Line
              type="monotone"
              dataKey="low"
              stroke="var(--color-chart-2)"
              strokeDasharray="5 5"
              dot={false}
              name="저가"
            />

            {/* 3. 종가 라인 차트 */}
            <Line
              type="monotone"
              dataKey="close"
              stroke="var(--color-chart-3)"
              dot={false}
              name="종가"
              strokeWidth={2}
            />
          </ComposedChart>
        )}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="glass-card p-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">최고가</p>
          <p className="text-base font-bold text-chart-1 tabular-nums">${formatPrice(highestPrice)}</p>
        </div>
        <div className="glass-card p-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">최저가</p>
          <p className="text-base font-bold text-chart-2 tabular-nums">${formatPrice(lowestPrice)}</p>
        </div>
      </div>
    </div>
  );
}
