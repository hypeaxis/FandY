import { useState } from 'react';
import FundingRateChart from './FundingRateChart';
import { chartData } from '../../data/mockData';
import './ChartPanel.css';

export default function ChartPanel({ market }) {
  const [timeframe, setTimeframe] = useState('1h');
  const timeframes = ['5m', '1h', '8h', '1D', '1W'];

  return (
    <div className="chart-panel">
      <div className="chart-panel__toolbar">
        <div className="chart-panel__timeframes">
          {timeframes.map(tf => (
            <button
              key={tf}
              className={`chart-panel__tf ${timeframe === tf ? 'chart-panel__tf--active' : ''}`}
              onClick={() => setTimeframe(tf)}
            >{tf}</button>
          ))}
        </div>
      </div>

      <div className="chart-panel__badges">
        <span className="chart-panel__badge chart-panel__badge--market">
          Market APR <strong>{market.marketAPR.toFixed(2)}%</strong>
        </span>
        <span className="chart-panel__badge chart-panel__badge--float">
          Float APR <strong>{market.floatAPR.toFixed(2)}%</strong>
          <button className="chart-panel__badge-close">×</button>
        </span>
      </div>

      <div className="chart-panel__canvas">
        <FundingRateChart data={chartData} />
      </div>
    </div>
  );
}
