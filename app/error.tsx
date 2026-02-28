'use client';

import { WarningCircleIcon } from '@phosphor-icons/react/dist/ssr';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  // 개발 중에는 콘솔에 남겨두면 디버깅 편함
  console.log(error);

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        <div className="glass-card relative max-w-md overflow-hidden p-8">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/20 blur-3xl rounded-full"></div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/20 text-(--color-chart-2) mb-4 border border-red-500/30">
              <WarningCircleIcon size={32} weight="bold" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">데이터를 불러오지 못했습니다</h2>
            <p className="text-muted-foreground">잠시 후 다시 시도해 주세요.</p>
          </div>

          <button
            type="button"
            aria-label="페이지 새로고침"
            onClick={() => reset()}
            className="w-full py-4 rounded-xl font-semibold text-white transition-all border-0 px-4 gap-2 cursor-pointer bg-primary! text-sm hover:scale-[1.02] active:scale-[0.98] shadow-lg">
            다시 시도하기
          </button>
        </div>
      </div>
    </div>
  );
}
