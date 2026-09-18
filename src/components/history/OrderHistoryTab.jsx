import { orderHistoryData } from '../../data/mockData';

export default function OrderHistoryTab() {
  return (
    <table className="history-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Market</th>
          <th>Direction</th>
          <th>Type</th>
          <th>Executed Size</th>
          <th>Order Size</th>
          <th>Implied APR</th>
          <th>Trigger Condition</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orderHistoryData.map((order, i) => (
          <tr key={i}>
            <td className="history-table__time">{order.time}</td>
            <td>
              <div className="history-table__market-cell">
                {order.icon && (
                  <img src={order.icon} alt="" className="history-table__market-icon" />
                )}
                <div>
                  <div className="history-table__market">{order.market}</div>
                  <div className="history-table__market-sub">{order.maturity}</div>
                </div>
              </div>
            </td>
            <td className={`history-table__direction--${order.direction.toLowerCase().replace(' ', '-')}`}>
              {order.direction}
            </td>
            <td>{order.type}</td>
            <td className="history-table__mono">{order.executedSize}</td>
            <td className="history-table__mono">{order.orderSize}</td>
            <td className="history-table__mono">{order.impliedAPR}%</td>
            <td>{order.triggerCondition}</td>
            <td className={order.status.usd >= 0 ? 'history-table__pnl--positive' : 'history-table__pnl--negative'}>
              {order.status.sol} SOL / {order.status.usd >= 0 ? '' : '-'}${Math.abs(order.status.usd)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
