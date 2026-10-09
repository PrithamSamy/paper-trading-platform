import { useState } from "react";
import { stocks, inr, priceOf } from "../data/mockData.js";

export default function Trade() {
  const [symbol, setSymbol] = useState("TCS");
  const [quantity, setQuantity] = useState(1);

  const total = priceOf(symbol) * Number(quantity || 0);

  const handleTrade = (type) => {
    if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
      alert("Quantity must be a whole number greater than 0.");
      return;
    }
    alert(`Demo only. ${type} ${quantity} ${symbol} will work after the backend is connected.`);
  };

  return (
    <div className="form-box">
      <h2>Buy / Sell</h2>
      <label>Stock
        <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
          {stocks.map((s) => (
            <option key={s.symbol} value={s.symbol}>{s.symbol} - {inr(s.price)}</option>
          ))}
        </select>
      </label>
      <label>Quantity
        <input
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <p>Estimated total: <strong>{inr(total)}</strong></p>
      <div className="btn-row">
        <button onClick={() => handleTrade("BUY")}>Buy</button>
        <button className="sell" onClick={() => handleTrade("SELL")}>Sell</button>
      </div>
    </div>
  );
}