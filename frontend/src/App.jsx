import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Stocks from "./pages/Stocks.jsx";
import Trade from "./pages/Trade.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Orders from "./pages/Orders.jsx";

const protect = (page) => (
  <ProtectedRoute>{page}</ProtectedRoute>
);

export default function App() {
  return (
    <>
      <Navbar />

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={protect(<Dashboard />)}
          />

          <Route
            path="/stocks"
            element={protect(<Stocks />)}
          />

          <Route
            path="/trade"
            element={protect(<Trade />)}
          />

          <Route
            path="/portfolio"
            element={protect(<Portfolio />)}
          />

          <Route
            path="/orders"
            element={protect(<Orders />)}
          />

          <Route
            path="/transactions"
            element={<Navigate to="/orders" replace />}
          />

          <Route
            path="*"
            element={<h2>Page not found</h2>}
          />
        </Routes>
      </main>

      <footer className="footer">
        Paper trading simulation. Virtual money only.
        No real trades, payments, or brokerage accounts.
      </footer>
    </>
  );
}