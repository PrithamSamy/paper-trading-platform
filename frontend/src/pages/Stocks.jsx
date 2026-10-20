import { useApi } from "../hooks/useApi.js";
import { inr } from "../utils/format.js";

export default function Stocks() {
  const { data, loading, error, reload } = useApi("/stocks");

  if (loading) return <p>Loading stocks...</p>;

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
        <h2>Stocks</h2>
        <button className="secondary" onClick={reload}>
          Refresh
        </button>
      </div>

      <p>Simulated prices stored in DynamoDB. Not live market quotes.</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.stocks.map((stock) => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>{inr(stock.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}