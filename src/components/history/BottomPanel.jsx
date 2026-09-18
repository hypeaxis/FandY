import { useState } from 'react';
import PositionsTab from './PositionsTab';
import OpenOrdersTab from './OpenOrdersTab';
import OrderHistoryTab from './OrderHistoryTab';
import TradeHistoryTab from './TradeHistoryTab';
import SettlementHistoryTab from './SettlementHistoryTab';
import './BottomPanel.css';

const tabs = [
  { id: 'positions', label: 'Positions', count: 2 },
  { id: 'openOrders', label: 'Open Orders', count: 0 },
  { id: 'orderHistory', label: 'Order History' },
  { id: 'tradeHistory', label: 'Trade History' },
  { id: 'settlementHistory', label: 'Settlement History' },
];

export default function BottomPanel({ market, onDeposit }) {
  const [activeTab, setActiveTab] = useState('positions');
  const [hideOtherPairs, setHideOtherPairs] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'positions': return <PositionsTab />;
      case 'openOrders': return <OpenOrdersTab />;
      case 'orderHistory': return <OrderHistoryTab />;
      case 'tradeHistory': return <TradeHistoryTab />;
      case 'settlementHistory': return <SettlementHistoryTab />;
      default: return null;
    }
  };

  return (
    <div className="bottom-panel">
      <div className="bottom-panel__header">
        <div className="bottom-panel__tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`bottom-panel__tab ${activeTab === tab.id ? 'bottom-panel__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="bottom-panel__tab-count">({tab.count})</span>
              )}
            </button>
          ))}
        </div>

        <div className="bottom-panel__controls">
          <label className="bottom-panel__toggle">
            Hide other pairs
            <div className={`bottom-panel__switch ${hideOtherPairs ? 'bottom-panel__switch--on' : ''}`} onClick={() => setHideOtherPairs(!hideOtherPairs)}>
              <div className="bottom-panel__switch-thumb"></div>
            </div>
          </label>
        </div>
      </div>

      <div className="bottom-panel__content">
        {renderTab()}
      </div>
    </div>
  );
}
