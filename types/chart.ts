export type StatusType = 'flat' | 'up' | 'down';
export interface Candle {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  hlRange: number[]; // 꼬리(High - Low)
  ocRange: number[]; // 몸통(Open - Close)
  status: StatusType;
}
