export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center p-12 text-muted-foreground" role="status" aria-live="polite">
      <p>{message}</p>
    </div>
  );
}
