function SkeletonItem({ width = 'w-full', height = 'h-4' }: { width?: string; height?: string }) {
  return <div className={`skeleton-item ${width} ${height}`} />;
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 flex flex-col">
      <SkeletonItem height="h-100" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <table className="table-auto w-full glass-card">
      <thead>
        <tr className="border-b border-border/50">
          <th className="px-6 py-4">
            <SkeletonItem height="h-6" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="align-baseline border-b border-border/50" role="button" tabIndex={0}>
          <td className="px-6 py-4">
            <SkeletonItem height="h-10" />
          </td>
        </tr>
        <tr className="align-baseline border-b border-border/50" role="button" tabIndex={0}>
          <td className="px-6 py-4">
            <SkeletonItem height="h-10" />
          </td>
        </tr>
        <tr className="align-baseline border-b border-border/50" role="button" tabIndex={0}>
          <td className="px-6 py-4">
            <SkeletonItem height="h-10" />
          </td>
        </tr>
        <tr className="align-baseline border-b border-border/50" role="button" tabIndex={0}>
          <td className="px-6 py-4">
            <SkeletonItem height="h-10" />
          </td>
        </tr>
        <tr className="align-baseline border-b border-border/50" role="button" tabIndex={0}>
          <td className="px-6 py-4">
            <SkeletonItem height="h-10" />
          </td>
        </tr>
        <tr className="align-baseline border-b border-border/50" role="button" tabIndex={0}>
          <td className="px-6 py-4">
            <SkeletonItem height="h-10" />
          </td>
        </tr>
        <tr className="align-baseline border-b border-border/50" role="button" tabIndex={0}>
          <td className="px-6 py-4">
            <SkeletonItem height="h-10" />
          </td>
        </tr>
        <tr className="align-baseline border-b border-border/50" role="button" tabIndex={0}>
          <td className="px-6 py-4">
            <SkeletonItem height="h-10" />
          </td>
        </tr>
        <tr className="align-baseline border-b border-border/50" role="button" tabIndex={0}>
          <td className="px-6 py-4">
            <SkeletonItem height="h-10" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
