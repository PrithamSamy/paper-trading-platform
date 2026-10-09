import { wallet, holdings, transactions, priceOf, inr } from "../data/mockData.js";

export default function Dashboard() {
  const invested = holdings.reduce((s, h) => s + h.quantity * h.averagePrice, 0);
  const portfolioValue = holdings.reduce((s, h) => s + h.quantity * priceOf(h.symbol), 0);
  const pnl = portfolioValue - invested;

  return (
    <>
      <h2>Dashboard</h2>
      <div className="notice">Showing mock data. Real data arrives in later phases.</div>

      <div className="cards">
        <div className="card">
          <div className="label">Virtual Cash</div>
          <div className="value">{inr(wallet.balance)}</div>
        </div>
        <div className="card">
          <div className="label">Portfolio Value</div>
          <div className="value">{inr(portfolioValue)}</div>
        </div>
        <div className="card">
          <div className="label">Profit / Loss</div>
          <div className={"value " + (pnl >= 0 ? "profit" : "loss")}>
            {pnl >= 0 ? "+" : "-"}{inr(Math.abs(pnl))}
          </div>
        </div>
      </div>

      <h3>Recent Transactions</h3>
      <table>
        <thead>
          <tr><th>Type</th><th>Stock</th><th>Qty</th><th>Price</th><th>Date</th></tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.transactionId}>
              <td>{t.type}</td><td>{t.symbol}</td><td>{t.quantity}</td>
              <td>{inr(t.price)}</td><td>{t.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}