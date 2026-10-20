import { useApi } from "../hooks/useApi.js";
import { inr, formatDate } from "../utils/format.js";

export default function Dashboard() {
  const wallet = useApi("/wallet");
  const portfolio = useApi("/portfolio");
  const orders = useApi("/orders");

  const loading =
    wallet.loading || portfolio.loading || orders.loading;

  const error =
    wallet.error || portfolio.error || orders.error;

  const refresh = () => {
    wallet.reload();
    portfolio.reload();
    orders.reload();
  };

  if (loading) return <p>Loading your account...</p>;

  if (error) {
    return (
      <>
        <p className="loss" role="alert">{error}</p>
        <button onClick={refresh}>Try again</button>
      </>
    );
  }

  const summary = portfolio.data.summary;
  const cash = wallet.data.balance;
  const recentOrders = orders.data.orders.slice(0, 5);

  return (
    <>
      <div className="page-heading">
        <h2>Dashboard</h2>
        <button className="secondary" onClick={refresh}>
          Refresh
        </button>
      </div>

      <div className="notice">
        Connected to AWS. All balances and trades use virtual money.
        Stock prices are simulated and fixed.
      </div>

      <div className="cards">
        <div className="card">
          <div className="label">Virtual Cash</div>
          <div className="value">{inr(cash)}</div>
        </div>

        <div className="card">
          <div className="label">Portfolio Value</div>
          <div className="value">
            {inr(summary.portfolioValue)}
          </div>
        </div>

        <div className="card">
          <div className="label">Unrealized Profit / Loss</div>
          <div
            className={`value ${
              summary.profitLoss >= 0 ? "profit" : "loss"
            }`}
          >
            {inr(summary.profitLoss)}
          </div>
        </div>

        <div className="card">
          <div className="label">Total Account Value</div>
          <div className="value">
            {inr(cash + summary.portfolioValue)}
          </div>
        </div>
      </div>

      <h3>Recent Orders</h3>

      {recentOrders.length === 0 ? (
        <p>No orders yet. Open Buy / Sell to place your first trade.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.type}</td>
                  <td>{order.symbol}</td>
                  <td>{order.quantity}</td>
                  <td>{inr(order.total)}</td>
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