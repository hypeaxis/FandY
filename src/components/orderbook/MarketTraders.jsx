import { generateMarketTraders } from '../../data/mockData';
import { useMemo } from 'react';

export default function MarketTraders() {
  const trades = useMemo(() => generateMarketTraders(), []);

  return (
    <div className="market-traders">
      <div className="market-traders__header">
        <span>APR (%)</span>
        <span>Size (USDT YU)</span>
        <span>Time</span>
      </div>
      {trades.map((trade, i) => (
        <div key={i} className="market-traders__row">
          <span className={`market-traders__rate--${trade.side}`}>
            {trade.rate.toFixed(2)}
          </span>
          <span className="market-traders__size">{trade.size.toLocaleString()}</span>
          <span className="market-traders__time">{trade.time}</span>
        </div>
      ))}
    </div>
  );
}
