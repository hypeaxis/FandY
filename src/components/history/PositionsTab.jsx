import { positionsData } from '../../data/mockData';

export default function PositionsTab() {
  if (positionsData.length === 0) {
    return <div className="history-table__empty">Your active positions will appear here</div>;
  }

  return (
    <table className="history-table">
      <thead>
        <tr>
          <th>Pair</th>
          <th className="history-table__sort">Notional Size ↕</th>
          <th className="history-table__sort">Position Value ↕</th>
          <th className="history-table__sort">My Fixed APR ↕</th>
          <th>Float APR</th>
          <th>Mark APR</th>
          <th>Liq. APR</th>
          <th className="history-table__sort">PnL (Since) ↕</th>
          <th>Margin</th>
          <th>TP/SL</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {positionsData.map((pos, i) => (
          <tr key={pos.id || `${pos.pair}-${i}`}>
            <td>
              <div className="history-table__market-cell">
                {pos.icon && (
                  <img src={pos.icon} alt="" className="history-table__market-icon" />
                )}
                <div>
                  <div className="history-table__market">{pos.pair}</div>
                  <div className="history-table__market-sub">{pos.platform} {pos.leverage} · {pos.expiry}</div>
                </div>
              </div>
            </td>
            <td className="history-table__mono">{pos.notionalSize}</td>
            <td className="history-table__mono">{pos.positionValue}</td>
            <td className="history-table__mono">Pay {pos.myFixedAPR}%</td>
            <td className="history-table__mono">Receive {pos.floatAPR}%</td>
            <td className="history-table__mono">{pos.markAPR}%</td>
            <td className="history-table__mono">{pos.liqAPR}%</td>
            <td className={pos.pnl >= 0 ? 'history-table__pnl--positive' : 'history-table__pnl--negative'}>
              {pos.pnl >= 0 ? '+' : ''}{pos.pnl}
            </td>
            <td className="history-table__mono">{pos.margin}</td>
            <td>
              <span className="history-table__dash">—/—</span>
            </td>
            <td>
              <button className="history-table__close-btn">Close</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
