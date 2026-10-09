import { stocks, inr } from "../data/mockData.js";

export default function Stocks() {
  return (
    <>
      <h2>Stocks</h2>
      <table>
        <thead>
          <tr><th>Symbol</th><th>Name</th><th>Price</th></tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr key={s.symbol}>
              <td>{s.symbol}</td><td>{s.name}</td><td>{inr(s.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}