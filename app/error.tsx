'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  // 개발 중에는 콘솔에 남겨두면 디버깅 편함
  console.log(error);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">데이터를 불러오지 못했어요</h1>
      <p className="mt-2 text-sm opacity-80">잠시 후 다시 시도해주세요.</p>

      <button className="mt-4 rounded-md border px-3 py-2" onClick={() => reset()}>
        다시 시도
      </button>

      {/* 개발용: 배포 전에는 숨기거나 제거해도 됨 */}
      <pre className="mt-4 whitespace-pre-wrap text-xs opacity-70">{error.message}</pre>
    </main>
  );
}
