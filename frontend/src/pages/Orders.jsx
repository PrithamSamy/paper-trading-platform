import { useApi } from "../hooks/useApi.js";
import { inr, formatDate } from "../utils/format.js";

export default function Orders() {
  const { data, loading, error, reload } = useApi("/orders");

  if (loading) return <p>Loading orders...</p>;

  if (error) {
    return (
      <>
        <p className="loss" role="alert">{error}</p>
        <button onClick={reload}>Try again</button>
      </>
    );
  }

  return (
    <>
      <div className="page-heading">
        <h2>Orders</h2>
        <button className="secondary" onClick={reload}>
          Refresh
        </button>
      </div>

      <p className="muted">
        Latest 50 orders. A newly placed order may take a moment to appear.
      </p>

      {data.orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.type}</td>
                  <td>{order.symbol}</td>
                  <td>{order.quantity}</td>
                  <td>{inr(order.price)}</td>
                  <td>{inr(order.total)}</td>
                  <td>{order.status}</td>
                  <td>{formatDate(order.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}