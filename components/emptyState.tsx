export function EmptyMarketList() {
  return (
    <div
      className="glass-card w-full px-6 py-4 flex items-center justify-center text-muted-foreground h-100"
      role="status"
      aria-live="polite">
      현재 조회 가능한 시세 정보가 없습니다.
    </div>
  );
}
