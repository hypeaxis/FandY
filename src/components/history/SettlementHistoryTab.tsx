'use client';

import { settlementHistoryData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function SettlementHistoryTab() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="border-b border-border-divider text-[11px] font-medium text-neutral-500">
            <th className="px-4 py-2 font-medium">Time</th>
            <th className="px-4 py-2 font-medium">Pair</th>
            <th className="px-4 py-2 font-medium">Direction</th>
            <th className="px-4 py-2 font-medium">Notional Size</th>
            <th className="px-4 py-2 font-medium">Position Value</th>
            <th className="px-4 py-2 font-medium">Yield Paid</th>
            <th className="px-4 py-2 font-medium">Yield Received</th>
            <th className="px-4 py-2 font-medium">Settlement</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {settlementHistoryData.map((item, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-2.5 font-mono text-neutral-500">{item.time}</td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  {item.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.icon}
                      alt=""
                      className="h-5 w-5 rounded-full object-contain"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-white">{item.pair}</div>
                    <div className="text-[10px] text-neutral-400">{item.interval}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2.5 font-medium text-long-green">{item.direction}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{item.notionalSize}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{item.positionValue}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{item.totalPaid}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{item.yieldReceived}</td>
              <td
                className={cn(
                  'px-4 py-2.5 font-mono font-semibold',
                  item.settlement.sol >= 0 ? 'text-long-green' : 'text-short-red'
                )}
              >
                {item.settlement.sol} SOL / {item.settlement.usd >= 0 ? '' : '-'}$
                {Math.abs(item.settlement.usd)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
