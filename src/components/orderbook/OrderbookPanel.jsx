import { useState } from 'react';
import Orderbook from './Orderbook';
import MarketTraders from './MarketTraders';
import './OrderbookPanel.css';

export default function OrderbookPanel({ orderbook, market }) {
  const [activeTab, setActiveTab] = useState('orderbook');

  return (
    <div className="ob-panel">
      <div className="ob-panel__tabs">
        <button
          className={`ob-panel__tab ${activeTab === 'orderbook' ? 'ob-panel__tab--active' : ''}`}
          onClick={() => setActiveTab('orderbook')}
        >Order Book</button>
        <button
          className={`ob-panel__tab ${activeTab === 'traders' ? 'ob-panel__tab--active' : ''}`}
          onClick={() => setActiveTab('traders')}
        >Market Trades</button>
      </div>

      <div className="ob-panel__content">
        {activeTab === 'orderbook' ? (
          <Orderbook data={orderbook} />
        ) : (
          <MarketTraders />
        )}
      </div>
    </div>
  );
}
