'use client';

import { orderHistoryData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function OrderHistoryTab() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="border-b border-border-divider text-[11px] font-medium text-neutral-500">
            <th className="px-4 py-2 font-medium">Time</th>
            <th className="px-4 py-2 font-medium">Market</th>
            <th className="px-4 py-2 font-medium">Direction</th>
            <th className="px-4 py-2 font-medium">Type</th>
            <th className="px-4 py-2 font-medium">Executed Size</th>
            <th className="px-4 py-2 font-medium">Order Size</th>
            <th className="px-4 py-2 font-medium">Implied APR</th>
            <th className="px-4 py-2 font-medium">Trigger Condition</th>
            <th className="px-4 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {orderHistoryData.map((order, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-2.5 font-mono text-neutral-500">{order.time}</td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  {order.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={order.icon}
                      alt=""
                      className="h-5 w-5 rounded-full object-contain"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-white">{order.market}</div>
                    <div className="text-[10px] text-neutral-400">{order.maturity}</div>
                  </div>
                </div>
              </td>
              <td
                className={cn(
                  'px-4 py-2.5 font-medium',
                  order.direction.toLowerCase().includes('long')
                    ? 'text-long-green'
                    : 'text-short-red'
                )}
              >
                {order.direction}
              </td>
              <td className="px-4 py-2.5 text-neutral-300">{order.type}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{order.executedSize}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{order.orderSize}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{order.impliedAPR}%</td>
              <td className="px-4 py-2.5 text-neutral-400">{order.triggerCondition}</td>
              <td
                className={cn(
                  'px-4 py-2.5 font-mono font-semibold',
                  order.status.usd >= 0 ? 'text-long-green' : 'text-short-red'
                )}
              >
                {order.status.sol} SOL / {order.status.usd >= 0 ? '' : '-'}$
                {Math.abs(order.status.usd)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
