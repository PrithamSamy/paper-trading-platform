import { transactions, inr } from "../data/mockData.js";

export default function Transactions() {
  return (
    <>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr><th>Type</th><th>Stock</th><th>Quantity</th><th>Price</th><th>Date</th></tr>
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