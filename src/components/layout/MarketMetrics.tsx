'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import { Market } from '@/types/market';
import { cn, formatNumber } from '@/lib/utils';

interface MarketMetricsProps {
  market: Market;
  markets: Market[];
  onSelectMarket: (id: string) => void;
}

export default function MarketMetrics({
  market,
  markets,
  onSelectMarket,
}: MarketMetricsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const countdown = useCountdown(market.nextSettlement);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-30 flex h-full w-full items-center gap-3 px-4 bg-transparent text-xs">
      {/* Market Selector & Main APR (Fixed on left, overflow-visible) */}
      <div className="flex shrink-0 items-center gap-4 relative z-40">
        {/* Dropdown Selector */}
        <div
          ref={dropdownRef}
          className={cn(
            'relative flex cursor-pointer items-center gap-2.5 rounded-lg border border-border-default bg-bg-tertiary/40 px-2.5 py-1 transition-colors hover:border-border-hover',
            dropdownOpen && 'border-border-active'
          )}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/40">
            {market.icon?.startsWith('/') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={market.icon}
                alt={market.id}
                className="h-full w-full object-contain"
              />
            ) : (
              <span>{market.icon}</span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-semibold text-white">
              <span>{market.id}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </div>
            <div className="flex items-center gap-1 text-[11px] text-neutral-400">
              <span>{market.platform}</span>
              <Info className="h-2.5 w-2.5 opacity-60" />
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-2 z-50 flex w-56 flex-col overflow-hidden rounded-lg border border-border-default bg-bg-secondary p-1 shadow-2xl backdrop-blur-md">
              {markets.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={cn(
                    'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs transition-colors hover:bg-bg-hover',
                    m.id === market.id && 'bg-brand-pink/10 text-brand-pink'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectMarket(m.id);
                    setDropdownOpen(false);
                  }}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/30">
                    {m.icon?.startsWith('/') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.icon}
                        alt={m.id}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span>{m.icon}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{m.id}</div>
                    <div className="text-[10px] text-neutral-400">
                      {m.platform}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Market APR Headline */}
        <div className="flex flex-col">
          <span className="font-mono text-base font-bold text-long-green leading-none">
            {market.marketAPR.toFixed(2)}%
          </span>
          <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium mt-0.5">
            Market APR
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-6 w-[1px] bg-border-divider shrink-0 mx-1" />

      {/* Metric Items (Scrollable) */}
      <div className="flex items-center gap-5 overflow-x-auto whitespace-nowrap min-w-0 flex-1">
        <div className="flex flex-col">
          <span className="text-[10px] text-neutral-500 font-medium">Mark APR</span>
          <span className="flex items-center gap-1 font-mono text-xs font-semibold text-white">
            {market.markAPR.toFixed(2)}%
            <Info className="h-2.5 w-2.5 text-neutral-500" />
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-neutral-500 font-medium">Float APR</span>
          <span className="flex items-center gap-1 font-mono text-xs font-semibold text-white">
            {market.floatAPR.toFixed(2)}%
            <Info className="h-2.5 w-2.5 text-neutral-500" />
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-neutral-500 font-medium">Notional OI</span>
          <span className="flex items-center gap-1 font-mono text-xs font-semibold text-white">
            {formatNumber(market.notionalOI)} {market.token}
            <Info className="h-2.5 w-2.5 text-neutral-500" />
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-neutral-500 font-medium">24h Volume</span>
          <span className="font-mono text-xs font-semibold text-white">
            {formatNumber(market.volume24h)} {market.token}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-neutral-500 font-medium">Next Settlement</span>
          <span
            className="rounded bg-brand-pink/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-brand-pink border border-brand-pink/30"
            suppressHydrationWarning
          >
            {countdown}
          </span>
        </div>
      </div>
    </div>
  );
}
