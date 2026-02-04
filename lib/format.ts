export function formatPrice(num: number) {
  return num.toFixed(2);
}

export const formatCompact = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 1,
});
