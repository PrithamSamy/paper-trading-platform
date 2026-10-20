import { useApi } from "../hooks/useApi.js";
import { inr } from "../utils/format.js";

export default function Portfolio() {
  const { data, loading, error, reload } = useApi("/portfolio");

  if (loading) return <p>Loading portfolio...</p>;

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
        <h2>Portfolio</h2>
        <button className="secondary" onClick={reload}>
          Refresh
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <div className="label">Invested in Current Holdings</div>
          <div className="value">
            {inr(data.summary.totalInvested)}
          </div>
        </div>

        <div className="card">
          <div className="label">Current Value</div>
          <div className="value">
            {inr(data.summary.portfolioValue)}
          </div>
        </div>
      </div>

      {data.holdings.length === 0 ? (
        <p>You do not own any shares yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Average Buy Price</th>
                <th>Current Price</th>
                <th>Current Value</th>
                <th>Unrealized P/L</th>
              </tr>
            </thead>
            <tbody>
              {data.holdings.map((holding) => (
                <tr key={holding.symbol}>
                  <td>{holding.symbol}</td>
                  <td>{holding.quantity}</td>
                  <td>{inr(holding.averagePrice)}</td>
                  <td>{inr(holding.currentPrice)}</td>
                  <td>{inr(holding.currentValue)}</td>
                  <td
                    className={
                      holding.profitLoss >= 0 ? "profit" : "loss"
                    }
                  >
                    {inr(holding.profitLoss)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}