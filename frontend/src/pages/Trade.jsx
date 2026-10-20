import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../api/client.js";
import { useApi } from "../hooks/useApi.js";
import { inr } from "../utils/format.js";

export default function Trade() {
  const stocks = useApi("/stocks");
  const wallet = useApi("/wallet");

  const [symbol, setSymbol] = useState("TCS");
  const [quantity, setQuantity] = useState("1");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitting = useRef(false);

  const reload = () => {
    stocks.reload();
    wallet.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting.current) return;

    const side = event.nativeEvent.submitter?.value;

    if (side !== "buy" && side !== "sell") return;

    setError("");
    setSuccess("");

    const amount = Number(quantity);

    if (
      !Number.isInteger(amount) ||
      amount < 1 ||
      amount > 10000
    ) {
      setError("Quantity must be a whole number between 1 and 10000.");
      return;
    }

    const confirmed = window.confirm(
      `${side.toUpperCase()} ${amount} ${symbol} using virtual money?`
    );

    if (!confirmed) return;

    submitting.current = true;
    setBusy(true);

    try {
      const result = await apiRequest(`/${side}`, {
        method: "POST",
        body: {
          symbol,
          quantity: amount,
        },
      });

      setSuccess(
        `${result.order.type} completed: ` +
        `${result.order.quantity} ${result.order.symbol}, ` +
        `total ${inr(result.order.total)}.`
      );

      wallet.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  };

  if (stocks.loading) return <p>Loading trading page...</p>;

  if (stocks.error || !stocks.data?.stocks?.length) {
    return (
      <>
        <p className="loss" role="alert">
          {stocks.error || "No stocks are available."}
        </p>
        <button onClick={reload}>Try again</button>
      </>
    );
  }

  const selected = stocks.data.stocks.find(
    (stock) => stock.symbol === symbol
  );

  const numericQuantity = Number(quantity);

  const estimatedTotal =
    selected &&
    Number.isInteger(numericQuantity) &&
    numericQuantity > 0
      ? selected.price * numericQuantity
      : 0;

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Buy / Sell</h2>

      <p>
        Available virtual cash:{" "}
        {wallet.loading
          ? "Loading..."
          : wallet.error
            ? "Unavailable"
            : inr(wallet.data.balance)}
      </p>

      {wallet.error && (
        <p className="loss" role="alert">{wallet.error}</p>
      )}

      {error && (
        <p className="loss" role="alert">{error}</p>
      )}

      {success && (
        <p className="profit" role="status">{success}</p>
      )}

      <label htmlFor="trade-symbol">Stock</label>
      <select
        id="trade-symbol"
        value={symbol}
        disabled={busy}
        onChange={(event) => {
          setSymbol(event.target.value);
          setSuccess("");
          setError("");
        }}
      >
        {stocks.data.stocks.map((stock) => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.symbol} — {inr(stock.price)}
          </option>
        ))}
      </select>

      <label htmlFor="trade-quantity">Quantity</label>
      <input
        id="trade-quantity"
        type="number"
        min="1"
        max="10000"
        step="1"
        required
        value={quantity}
        disabled={busy}
        onChange={(event) => {
          setQuantity(event.target.value);
          setSuccess("");
          setError("");
        }}
      />

      <p>Estimated total: {inr(estimatedTotal)}</p>

      <div className="btn-row">
        <button
          type="submit"
          value="buy"
          disabled={busy}
        >
          {busy ? "Processing..." : "Buy"}
        </button>

        <button
          type="submit"
          value="sell"
          className="sell"
          disabled={busy}
        >
          {busy ? "Processing..." : "Sell"}
        </button>
      </div>

      <p className="muted">
        Virtual money only. You can sell only shares you own.
      </p>

      <p>
        <Link to="/portfolio">View portfolio</Link>
        {" · "}
        <Link to="/orders">View orders</Link>
      </p>
    </form>
  );
}
