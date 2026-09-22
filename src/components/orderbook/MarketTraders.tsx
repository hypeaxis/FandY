'use client';

import { useMemo } from 'react';
import { generateMarketTraders } from '@/data/mockData';
import { MarketTraderItem } from '@/types/market';
import { cn, formatNumber } from '@/lib/utils';

export default function MarketTraders() {
  const trades: MarketTraderItem[] = useMemo(() => generateMarketTraders(), []);

  return (
    <div className="flex h-full w-full flex-col font-mono text-xs">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr_70px] border-b border-border-divider px-3 py-1.5 font-sans text-[11px] font-medium text-neutral-500 shrink-0">
        <span>APR (%)</span>
        <span className="text-right">Size (USDT YU)</span>
        <span className="text-right">Time</span>
      </div>

      {/* Trades List */}
      <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-white/[0.02]">
        {trades.map((trade, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1fr_70px] px-3 py-1 text-[11px] hover:bg-white/[0.03]"
          >
            <span
              className={cn(
                'font-semibold',
                trade.side === 'long' ? 'text-long-green' : 'text-short-red'
              )}
            >
              {trade.rate.toFixed(2)}
            </span>
            <span className="text-right text-neutral-200">
              {formatNumber(trade.size)}
            </span>
            <span className="text-right text-neutral-500">{trade.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
