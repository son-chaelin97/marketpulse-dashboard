export function toNumber(value: string, fieldName: string): number {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    throw new Error(`Invalid number for ${fieldName}: "${value}"`);
  }
  return num;
}
