import { openOrdersData } from '../../data/mockData';

export default function OpenOrdersTab() {
  if (openOrdersData.length === 0) {
    return <div className="history-table__empty">No open orders</div>;
  }

  return (
    <table className="history-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Market</th>
          <th>Direction</th>
          <th>Type</th>
          <th>Size</th>
          <th>APR</th>
          <th>Trigger</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {openOrdersData.map((order, i) => (
          <tr key={i}>
            <td className="history-table__time">{order.time}</td>
            <td className="history-table__market">{order.market}</td>
            <td>{order.direction}</td>
            <td>{order.type}</td>
            <td className="history-table__mono">{order.size}</td>
            <td className="history-table__mono">{order.apr}%</td>
            <td>{order.trigger}</td>
            <td>{order.status}</td>
            <td><button className="history-table__close-btn">Cancel</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
