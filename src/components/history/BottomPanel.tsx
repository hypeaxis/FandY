'use client';

import { useState } from 'react';
import PositionsTab from './PositionsTab';
import OpenOrdersTab from './OpenOrdersTab';
import OrderHistoryTab from './OrderHistoryTab';
import TradeHistoryTab from './TradeHistoryTab';
import SettlementHistoryTab from './SettlementHistoryTab';
import { Market } from '@/types/market';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'positions', label: 'Positions', count: 2 },
  { id: 'openOrders', label: 'Open Orders', count: 0 },
  { id: 'orderHistory', label: 'Order History' },
  { id: 'tradeHistory', label: 'Trade History' },
  { id: 'settlementHistory', label: 'Settlement History' },
];

interface BottomPanelProps {
  market?: Market;
  onDeposit?: () => void;
}

export default function BottomPanel({ market, onDeposit }: BottomPanelProps) {
  const [activeTab, setActiveTab] = useState('positions');
  const [hideOtherPairs, setHideOtherPairs] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'positions':
        return <PositionsTab hideOtherPairs={hideOtherPairs} market={market} />;
      case 'openOrders':
        return <OpenOrdersTab />;
      case 'orderHistory':
        return <OrderHistoryTab />;
      case 'tradeHistory':
        return <TradeHistoryTab />;
      case 'settlementHistory':
        return <SettlementHistoryTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-transparent">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border-divider px-4 overflow-x-auto">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={cn(
                'whitespace-nowrap px-4 py-2.5 text-xs font-semibold transition-all border-b-2 border-transparent hover:text-white',
                activeTab === tab.id
                  ? 'border-b-brand-pink text-white bg-gradient-to-b from-brand-pink/15 to-transparent'
                  : 'text-neutral-400'
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1 opacity-70">({tab.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-400 whitespace-nowrap">
            <span>Hide other pairs</span>
            <button
              type="button"
              role="switch"
              aria-checked={hideOtherPairs}
              className={cn(
                'relative h-4 w-8 rounded-full transition-colors',
                hideOtherPairs ? 'bg-brand-pink' : 'bg-border-default'
              )}
              onClick={() => setHideOtherPairs(!hideOtherPairs)}
            >
              <span
                className={cn(
                  'absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white transition-transform',
                  hideOtherPairs && 'translate-x-4'
                )}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0">{renderTab()}</div>
    </div>
  );
}
