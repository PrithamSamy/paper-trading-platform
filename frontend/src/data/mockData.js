export const stocks = [
  { symbol: "TCS", name: "Tata Consultancy Services", price: 4000 },
  { symbol: "INFY", name: "Infosys", price: 1600 },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 1400 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1800 },
  { symbol: "SBIN", name: "State Bank of India", price: 800 },
];

export const wallet = { balance: 100000 };

export const holdings = [
  { symbol: "TCS", quantity: 5, averagePrice: 3900 },
  { symbol: "INFY", quantity: 10, averagePrice: 1550 },
];

export const transactions = [
  { transactionId: "t1", type: "BUY", symbol: "TCS", quantity: 5, price: 3900, timestamp: "2026-10-01 10:15" },
  { transactionId: "t2", type: "BUY", symbol: "INFY", quantity: 10, price: 1550, timestamp: "2026-10-02 11:40" },
];

export const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

export const priceOf = (symbol) =>
  stocks.find((s) => s.symbol === symbol)?.price ?? 0;