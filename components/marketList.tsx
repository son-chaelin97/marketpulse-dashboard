import { Market } from '@/types/market';
import MarketRow from './marketRow';

export default function MarketList({ markets }: { markets: Market[] }) {
  return <ul className="mt-4 space-y-2">{markets.map(MarketRow)}</ul>;
}
