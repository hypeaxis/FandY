'use client';

import { useEffect } from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import MarketMetrics from '@/components/layout/MarketMetrics';
import ChartPanel from '@/components/chart/ChartPanel';
import OrderbookPanel from '@/components/orderbook/OrderbookPanel';
import OrderForm from '@/components/order/OrderForm';
import BottomPanel from '@/components/history/BottomPanel';
import AccountPanel from '@/components/account/AccountPanel';
import { useRouter } from 'next/navigation';
import { useAppModals } from '@/components/layout/AppShell';

interface MarketViewProps {
  initialMarketId?: string;
  onDeposit?: () => void;
  onWithdraw?: () => void;
}

export default function MarketView({
  initialMarketId = 'SOL-PERP',
  onDeposit,
  onWithdraw,
}: MarketViewProps) {
  const router = useRouter();
  const data = useMarketData(initialMarketId);
  const { setActiveMarket } = useAppModals();

  useEffect(() => {
    if (data.selectedMarket) {
      setActiveMarket(data.selectedMarket);
    }
  }, [data.selectedMarket, setActiveMarket]);

  const {
    markets,
    selectedMarket,
    selectMarket,
    orderbook,
    account,
    marginMode,
    setMarginMode,
    leverage,
    setLeverage,
    positionMode,
    setPositionMode,
    orderType,
    setOrderType,
    side,
    setSide,
  } = data;

  const handleSelectMarket = (marketId: string) => {
    selectMarket(marketId);
    // Optional shallow URL update
    router.replace(`/trade/${marketId}`);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_330px] gap-2.5 p-2.5 md:px-3.5 md:py-2.5 h-auto lg:h-[calc(100vh-48px)] overflow-y-auto lg:overflow-hidden bg-bg-primary">
      {/* Left Main Area: Upper Row (Chart Col + Orderbook) + Bottom Panel */}
      <div className="flex flex-col gap-2.5 min-h-0 overflow-hidden">
        {/* Upper Row: Left has (Metrics + Chart), Right has Orderbook */}
        <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_300px] gap-2.5 flex-1 min-h-0">
          {/* Chart Column: Box 1 (Metrics) on top, Box 2 (Chart) below */}
          <div className="flex flex-col gap-2.5 min-h-0 overflow-hidden">
            {/* Box 1: Metrics Bar */}
            <div className="h-[58px] shrink-0 rounded-xl border border-white/[0.08] bg-bg-secondary shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:border-white/[0.12] transition-colors relative z-40 overflow-visible">
              <MarketMetrics
                market={selectedMarket}
                markets={markets}
                onSelectMarket={handleSelectMarket}
              />
            </div>

            {/* Box 2: Chart */}
            <div className="flex-1 min-h-[360px] md:min-h-0 rounded-xl border border-white/[0.08] bg-bg-secondary shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:border-white/[0.12] transition-colors overflow-hidden flex flex-col">
              <ChartPanel market={selectedMarket} />
            </div>
          </div>

          {/* Box 3: Orderbook */}
          <div className="min-h-[340px] md:min-h-0 h-full rounded-xl border border-white/[0.08] bg-bg-secondary shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:border-white/[0.12] transition-colors overflow-hidden flex flex-col">
            <OrderbookPanel orderbook={orderbook} market={selectedMarket} />
          </div>
        </div>

        {/* Box 4: Bottom Panel (Positions / History) */}
        <div className="h-[240px] shrink-0 rounded-xl border border-white/[0.08] bg-bg-secondary shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:border-white/[0.12] transition-colors overflow-hidden flex flex-col">
          <BottomPanel market={selectedMarket} onDeposit={onDeposit} />
        </div>
      </div>

      {/* Right Sidebar: Order Form + Account Panel */}
      <div className="flex flex-col gap-2.5 min-h-0 overflow-hidden">
        {/* Box 5: Order Form */}
        <div className="flex-1 min-h-0 rounded-xl border border-white/[0.08] bg-bg-secondary shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:border-white/[0.12] transition-colors overflow-y-auto flex flex-col">
          <OrderForm
            market={selectedMarket}
            marginMode={marginMode}
            setMarginMode={setMarginMode}
            leverage={leverage}
            setLeverage={setLeverage}
            positionMode={positionMode}
            setPositionMode={setPositionMode}
            orderType={orderType}
            setOrderType={setOrderType}
            side={side}
            setSide={setSide}
          />
        </div>

        {/* Box 6: Account Panel */}
        <div className="h-[240px] shrink-0 rounded-xl border border-white/[0.08] bg-bg-secondary shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:border-white/[0.12] transition-colors overflow-hidden flex flex-col">
          <AccountPanel
            account={account}
            market={selectedMarket}
            onDeposit={onDeposit}
            onWithdraw={onWithdraw}
          />
        </div>
      </div>
    </div>
  );
}
