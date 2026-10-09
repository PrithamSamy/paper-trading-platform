import { holdings, priceOf, inr } from "../data/mockData.js";

export default function Portfolio() {
  return (
    <>
      <h2>Portfolio</h2>
      <table>
        <thead>
          <tr>
            <th>Stock</th><th>Quantity</th><th>Avg Buy Price</th>
            <th>Current Price</th><th>Profit / Loss</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => {
            const current = priceOf(h.symbol);
            const pnl = (current - h.averagePrice) * h.quantity;
            return (
              <tr key={h.symbol}>
                <td>{h.symbol}</td>
                <td>{h.quantity}</td>
                <td>{inr(h.averagePrice)}</td>
                <td>{inr(current)}</td>
                <td className={pnl >= 0 ? "profit" : "loss"}>
                  {pnl >= 0 ? "+" : "-"}{inr(Math.abs(pnl))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}