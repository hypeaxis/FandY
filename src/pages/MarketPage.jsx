import { useMarketData } from '../hooks/useMarketData';
import MarketMetrics from '../components/layout/MarketMetrics';
import ChartPanel from '../components/chart/ChartPanel';
import OrderbookPanel from '../components/orderbook/OrderbookPanel';
import OrderForm from '../components/order/OrderForm';
import BottomPanel from '../components/history/BottomPanel';
import AccountPanel from '../components/account/AccountPanel';
import './MarketPage.css';

export default function MarketPage({ marketData: externalMarketData, onDeposit, onWithdraw }) {
  const fallbackMarketData = useMarketData();
  const data = externalMarketData || fallbackMarketData;

  const {
    markets,
    selectedMarket,
    selectMarket,
    orderbook,
    account,
    marginMode, setMarginMode,
    leverage, setLeverage,
    positionMode, setPositionMode,
    orderType, setOrderType,
    side, setSide,
  } = data;

  return (
    <div className="market-layout">
      {/* Left Main Area: Upper Row (Chart Col + Orderbook) + Bottom Panel */}
      <div className="market-layout__main">
        {/* Upper Row: Left has (Metrics + Chart), Right has Orderbook */}
        <div className="market-layout__upper-row">
          {/* Chart Column: Box 1 (Metrics) on top, Box 2 (Chart) below */}
          <div className="market-layout__chart-col">
            <div className="market-layout__box market-layout__box--metrics">
              <MarketMetrics
                market={selectedMarket}
                markets={markets}
                onSelectMarket={selectMarket}
              />
            </div>
            <div className="market-layout__box market-layout__box--chart">
              <ChartPanel market={selectedMarket} />
            </div>
          </div>

          {/* Box 3: Orderbook (tall card starting at top, level with Metrics timer) */}
          <div className="market-layout__box market-layout__box--orderbook">
            <OrderbookPanel orderbook={orderbook} market={selectedMarket} />
          </div>
        </div>

        {/* Box 4: Bottom Panel (Positions / History - spans full width under Chart Col + Orderbook) */}
        <div className="market-layout__box market-layout__box--bottom">
          <BottomPanel market={selectedMarket} onDeposit={onDeposit} />
        </div>
      </div>

      {/* Right Sidebar: Order Form + Account Panel */}
      <div className="market-layout__sidebar">
        {/* Box 5: Order Form */}
        <div className="market-layout__box market-layout__box--order">
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
        <div className="market-layout__box market-layout__box--account">
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
