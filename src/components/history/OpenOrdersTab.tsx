'use client';

import { openOrdersData } from '@/data/mockData';

export default function OpenOrdersTab() {
  if (openOrdersData.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-xs text-neutral-500">
        No open orders
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="border-b border-border-divider text-[11px] font-medium text-neutral-500">
            <th className="px-4 py-2 font-medium">Time</th>
            <th className="px-4 py-2 font-medium">Market</th>
            <th className="px-4 py-2 font-medium">Direction</th>
            <th className="px-4 py-2 font-medium">Type</th>
            <th className="px-4 py-2 font-medium">Size</th>
            <th className="px-4 py-2 font-medium">APR</th>
            <th className="px-4 py-2 font-medium">Trigger</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium" />
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {openOrdersData.map((order, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-2.5 font-mono text-neutral-500">{order.time}</td>
              <td className="px-4 py-2.5 font-semibold text-white">{order.market}</td>
              <td className="px-4 py-2.5">{order.side}</td>
              <td className="px-4 py-2.5">{order.type}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{order.amount}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-200">{order.price}%</td>
              <td className="px-4 py-2.5 text-neutral-400">-</td>
              <td className="px-4 py-2.5 text-neutral-400">{order.status}</td>
              <td className="px-4 py-2.5 text-right">
                <button
                  type="button"
                  className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
