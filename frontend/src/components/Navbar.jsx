import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="brand">Paper Trading</span>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/stocks">Stocks</NavLink>
      <NavLink to="/trade">Buy / Sell</NavLink>
      <NavLink to="/portfolio">Portfolio</NavLink>
      <NavLink to="/transactions">Transactions</NavLink>
      <span className="spacer" />
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
}