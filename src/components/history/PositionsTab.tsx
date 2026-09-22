import { useMemo } from 'react';
import { positionsData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Market } from '@/types/market';

interface PositionsTabProps {
  hideOtherPairs?: boolean;
  market?: Market;
}

export default function PositionsTab({ hideOtherPairs, market }: PositionsTabProps) {
  const displayPositions = useMemo(() => {
    if (!hideOtherPairs || !market) return positionsData;
    const base = market.baseToken || market.id.split('-')[0];
    return positionsData.filter((pos) => {
      return (
        pos.pair.toUpperCase().includes(base.toUpperCase()) ||
        pos.pair.toUpperCase().includes(market.id.toUpperCase())
      );
    });
  }, [hideOtherPairs, market]);

  if (displayPositions.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-xs text-neutral-500">
        No active positions for this pair
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="border-b border-border-divider text-[11px] font-medium text-neutral-500">
            <th className="px-4 py-2 font-medium">Pair</th>
            <th className="px-4 py-2 font-medium">Notional Size ↕</th>
            <th className="px-4 py-2 font-medium">Position Value ↕</th>
            <th className="px-4 py-2 font-medium">My Fixed APR ↕</th>
            <th className="px-4 py-2 font-medium">Float APR</th>
            <th className="px-4 py-2 font-medium">Mark APR</th>
            <th className="px-4 py-2 font-medium">Liq. APR</th>
            <th className="px-4 py-2 font-medium">PnL (Since) ↕</th>
            <th className="px-4 py-2 font-medium">Margin</th>
            <th className="px-4 py-2 font-medium">TP/SL</th>
            <th className="px-4 py-2 font-medium" />
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {displayPositions.map((pos, i) => (
            <tr key={`${pos.pair}-${i}`} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  {pos.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={pos.icon}
                      alt=""
                      className="h-5 w-5 rounded-full object-contain"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-white">{pos.pair}</div>
                    <div className="text-[10px] text-neutral-400">
                      {pos.platform} {pos.leverage} · {pos.expiry}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{pos.notionalSize}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{pos.positionValue}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">Pay {pos.myFixedAPR}%</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">Receive {pos.floatAPR}%</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{pos.markAPR}%</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{pos.liqAPR}%</td>
              <td
                className={cn(
                  'px-4 py-2.5 font-mono font-semibold',
                  pos.pnl >= 0 ? 'text-long-green' : 'text-short-red'
                )}
              >
                {pos.pnl >= 0 ? '+' : ''}
                {pos.pnl}
              </td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{pos.margin}</td>
              <td className="px-4 py-2.5 text-neutral-500">—/—</td>
              <td className="px-4 py-2.5 text-right">
                <button
                  type="button"
                  className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Close
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
