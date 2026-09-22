'use client';

import { useState } from 'react';
import FundingRateChart from './FundingRateChart';
import { chartData } from '@/data/mockData';
import { Market } from '@/types/market';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ChartPanelProps {
  market: Market;
}

export default function ChartPanel({ market }: ChartPanelProps) {
  const [timeframe, setTimeframe] = useState('1h');
  const [showFloatBadge, setShowFloatBadge] = useState(true);
  const timeframes = ['5m', '1h', '8h', '1D', '1W'];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-transparent">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-4 py-2">
        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded bg-brand-pink/10 px-2 py-0.5 text-xs text-brand-pink border border-brand-pink/30">
            Market APR <strong className="font-mono text-white">{market.marketAPR.toFixed(2)}%</strong>
          </span>

          {showFloatBadge && (
            <span className="inline-flex items-center gap-1.5 rounded bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400 border border-blue-500/30">
              Float APR <strong className="font-mono text-white">{market.floatAPR.toFixed(2)}%</strong>
              <button
                type="button"
                onClick={() => setShowFloatBadge(false)}
                className="hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>

        {/* Timeframes */}
        <div className="flex items-center gap-1 rounded-full bg-white/5 p-0.5">
          {timeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={cn(
                'rounded-full px-2.5 py-0.5 text-xs font-medium text-neutral-400 transition-colors hover:text-white',
                timeframe === tf && 'bg-brand-pink text-white font-semibold shadow-sm'
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative flex-1 min-h-0 w-full p-2">
        <FundingRateChart data={chartData} />
      </div>
    </div>
  );
}
