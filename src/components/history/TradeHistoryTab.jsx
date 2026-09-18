import { tradeHistoryData } from '../../data/mockData';

export default function TradeHistoryTab() {
  return (
    <table className="history-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Market</th>
          <th>Direction</th>
          <th>Position Size</th>
          <th>Trade Value</th>
          <th>Fixed APR</th>
          <th>Trade PnL</th>
        </tr>
      </thead>
      <tbody>
        {tradeHistoryData.map((trade, i) => (
          <tr key={i}>
            <td className="history-table__time">{trade.time}</td>
            <td>
              <div className="history-table__market-cell">
                {trade.icon && (
                  <img src={trade.icon} alt="" className="history-table__market-icon" />
                )}
                <div>
                  <div className="history-table__market">{trade.market}</div>
                  <div className="history-table__market-sub">{trade.maturity}</div>
                </div>
              </div>
            </td>
            <td className={`history-table__direction--${trade.direction.toLowerCase().replace(' ', '-')}`}>
              {trade.direction}
            </td>
            <td className="history-table__mono">{trade.positionSize}</td>
            <td className="history-table__mono">{trade.tradeValue}</td>
            <td className="history-table__mono">{trade.fixedAPR}%</td>
            <td className={trade.tradePnL.sol >= 0 ? 'history-table__pnl--positive' : 'history-table__pnl--negative'}>
              {trade.tradePnL.sol} SOL / {trade.tradePnL.usd >= 0 ? '' : '-'}${Math.abs(trade.tradePnL.usd)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
