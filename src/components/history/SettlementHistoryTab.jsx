import { settlementHistoryData } from '../../data/mockData';

export default function SettlementHistoryTab() {
  return (
    <table className="history-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Pair</th>
          <th>Direction</th>
          <th>Notional Size</th>
          <th>Position Value</th>
          <th>Yield Paid</th>
          <th>Yield Received</th>
          <th>Settlement</th>
        </tr>
      </thead>
      <tbody>
        {settlementHistoryData.map((item, i) => (
          <tr key={i}>
            <td className="history-table__time">{item.time}</td>
            <td>
              <div className="history-table__market-cell">
                {item.icon && (
                  <img src={item.icon} alt="" className="history-table__market-icon" />
                )}
                <div>
                  <div className="history-table__market">{item.pair}</div>
                  <div className="history-table__market-sub">{item.interval}</div>
                </div>
              </div>
            </td>
            <td className="history-table__direction--long">{item.direction}</td>
            <td className="history-table__mono">{item.notionalSize}</td>
            <td className="history-table__mono">{item.positionValue}</td>
            <td className="history-table__mono">{item.totalPaid}</td>
            <td className="history-table__mono">{item.yieldReceived}</td>
            <td className={item.settlement.sol >= 0 ? 'history-table__pnl--positive' : 'history-table__pnl--negative'}>
              {item.settlement.sol} SOL / {item.settlement.usd >= 0 ? '' : '-'}${Math.abs(item.settlement.usd)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
