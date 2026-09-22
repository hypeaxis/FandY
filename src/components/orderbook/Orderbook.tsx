'use client';

import { useMemo } from 'react';
import { OrderbookData } from '@/types/market';
import { formatNumber } from '@/lib/utils';

interface OrderbookProps {
  data: OrderbookData;
}

export default function Orderbook({ data }: OrderbookProps) {
  const { shortRates, longRates, spread } = data;

  const maxShortSize = useMemo(
    () => Math.max(...shortRates.map((r) => r.size), 1),
    [shortRates]
  );
  const maxLongSize = useMemo(
    () => Math.max(...longRates.map((r) => r.size), 1),
    [longRates]
  );

  return (
    <div className="flex h-full w-full flex-col font-mono text-xs">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr_70px] border-b border-border-divider px-3 py-1.5 font-sans text-[11px] font-medium text-neutral-500 shrink-0">
        <span>APR (%)</span>
        <span className="text-right">Size (YU)</span>
        <span className="text-right">Time</span>
      </div>

      {/* Shorts list */}
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col justify-end">
        {shortRates.slice(-14).map((row, i) => (
          <div
            key={`s-${i}`}
            className="group relative grid grid-cols-[1fr_1fr_70px] px-3 py-0.5 text-[11px] hover:bg-white/[0.03]"
          >
            <div
              className="absolute right-0 top-0 bottom-0 bg-short-red/10 pointer-events-none transition-all"
              style={{ width: `${(row.size / maxShortSize) * 100}%` }}
            />
            <span className="relative z-10 font-semibold text-short-red">
              {row.rate.toFixed(2)}
            </span>
            <span className="relative z-10 text-right text-neutral-200">
              {formatNumber(row.size)}
            </span>
            <span className="relative z-10 text-right text-neutral-500">
              {row.time}
            </span>
          </div>
        ))}
      </div>

      {/* Spread Bar */}
      <div className="flex items-center justify-center border-y border-border-divider bg-bg-tertiary/60 py-1 font-mono text-[11px] font-semibold text-neutral-400 shrink-0">
        {spread.toFixed(1)}% Spread
      </div>

      {/* Longs list */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {longRates.slice(0, 14).map((row, i) => (
          <div
            key={`l-${i}`}
            className="group relative grid grid-cols-[1fr_1fr_70px] px-3 py-0.5 text-[11px] hover:bg-white/[0.03]"
          >
            <div
              className="absolute right-0 top-0 bottom-0 bg-long-green/10 pointer-events-none transition-all"
              style={{ width: `${(row.size / maxLongSize) * 100}%` }}
            />
            <span className="relative z-10 font-semibold text-long-green">
              {row.rate.toFixed(2)}
            </span>
            <span className="relative z-10 text-right text-neutral-200">
              {formatNumber(row.size)}
            </span>
            <span className="relative z-10 text-right text-neutral-500">
              {row.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
