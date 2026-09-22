'use client';

import { tradeHistoryData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function TradeHistoryTab() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="border-b border-border-divider text-[11px] font-medium text-neutral-500">
            <th className="px-4 py-2 font-medium">Time</th>
            <th className="px-4 py-2 font-medium">Market</th>
            <th className="px-4 py-2 font-medium">Direction</th>
            <th className="px-4 py-2 font-medium">Position Size</th>
            <th className="px-4 py-2 font-medium">Trade Value</th>
            <th className="px-4 py-2 font-medium">Fixed APR</th>
            <th className="px-4 py-2 font-medium">Trade PnL</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {tradeHistoryData.map((trade, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-2.5 font-mono text-neutral-500">{trade.time}</td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  {trade.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={trade.icon}
                      alt=""
                      className="h-5 w-5 rounded-full object-contain"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-white">{trade.market}</div>
                    <div className="text-[10px] text-neutral-400">{trade.maturity}</div>
                  </div>
                </div>
              </td>
              <td
                className={cn(
                  'px-4 py-2.5 font-medium',
                  trade.direction.toLowerCase().includes('long')
                    ? 'text-long-green'
                    : 'text-short-red'
                )}
              >
                {trade.direction}
              </td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{trade.positionSize}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{trade.tradeValue}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{trade.fixedAPR}%</td>
              <td
                className={cn(
                  'px-4 py-2.5 font-mono font-semibold',
                  trade.tradePnL.sol >= 0 ? 'text-long-green' : 'text-short-red'
                )}
              >
                {trade.tradePnL.sol} SOL / {trade.tradePnL.usd >= 0 ? '' : '-'}$
                {Math.abs(trade.tradePnL.usd)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
