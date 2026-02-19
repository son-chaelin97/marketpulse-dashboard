export default function Loading() {
  return (
    <div className="flex items-center justify-center p-12" role="status" aria-live="polite">
      <span className="text-muted-foreground">로딩 중...</span>
    </div>
  );
}
