import { useMemo } from 'react';

export default function Orderbook({ data }) {
  const { shortRates, longRates, spread } = data;

  const maxShortSize = useMemo(() => Math.max(...shortRates.map(r => r.size)), [shortRates]);
  const maxLongSize = useMemo(() => Math.max(...longRates.map(r => r.size)), [longRates]);

  return (
    <div className="orderbook">
      <div className="orderbook__header">
        <span>APR (%)</span>
        <span>Size (YU)</span>
        <span>Time</span>
      </div>

      <div className="orderbook__shorts">
        {shortRates.map((row, i) => (
          <div key={`s-${i}`} className="orderbook__row orderbook__row--short">
            <div className="orderbook__depth" style={{ width: `${(row.size / maxShortSize) * 100}%` }}></div>
            <span className="orderbook__rate">{row.rate.toFixed(2)}</span>
            <span className="orderbook__size">{row.size.toLocaleString()}</span>
            <span className="orderbook__time">{row.time}</span>
          </div>
        ))}
      </div>

      <div className="orderbook__spread">
        {spread.toFixed(1)}% Spread
      </div>

      <div className="orderbook__longs">
        {longRates.map((row, i) => (
          <div key={`l-${i}`} className="orderbook__row orderbook__row--long">
            <div className="orderbook__depth" style={{ width: `${(row.size / maxLongSize) * 100}%` }}></div>
            <span className="orderbook__rate">{row.rate.toFixed(2)}</span>
            <span className="orderbook__size">{row.size.toLocaleString()}</span>
            <span className="orderbook__time">{row.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
