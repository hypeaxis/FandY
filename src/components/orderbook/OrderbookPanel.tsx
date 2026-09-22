'use client';

import { useState } from 'react';
import Orderbook from './Orderbook';
import MarketTraders from './MarketTraders';
import { OrderbookData, Market } from '@/types/market';
import { cn } from '@/lib/utils';

interface OrderbookPanelProps {
  orderbook: OrderbookData;
  market?: Market;
}

export default function OrderbookPanel({ orderbook }: OrderbookPanelProps) {
  const [activeTab, setActiveTab] = useState<'orderbook' | 'traders'>('orderbook');

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-transparent">
      {/* Tabs */}
      <div className="flex shrink-0 border-b border-white/5">
        <button
          type="button"
          className={cn(
            'flex-1 py-2 text-center text-xs font-semibold text-neutral-400 transition-all border-b-2 border-transparent hover:text-white',
            activeTab === 'orderbook' &&
              'border-b-brand-pink text-white bg-gradient-to-b from-brand-pink/10 to-transparent'
          )}
          onClick={() => setActiveTab('orderbook')}
        >
          Order Book
        </button>

        <button
          type="button"
          className={cn(
            'flex-1 py-2 text-center text-xs font-semibold text-neutral-400 transition-all border-b-2 border-transparent hover:text-white',
            activeTab === 'traders' &&
              'border-b-brand-pink text-white bg-gradient-to-b from-brand-pink/10 to-transparent'
          )}
          onClick={() => setActiveTab('traders')}
        >
          Market Trades
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {activeTab === 'orderbook' ? (
          <Orderbook data={orderbook} />
        ) : (
          <MarketTraders />
        )}
      </div>
    </div>
  );
}
