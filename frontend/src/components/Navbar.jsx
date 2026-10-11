import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Navbar() {
  const { user, logout, getAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCopyToken = async () => {
    try {
      const token = await getAccessToken();
      await navigator.clipboard.writeText(token);
      alert("Access token copied to clipboard. Do not share it.");
    } catch {
      alert("Could not get token. Please log in again.");
    }
  };

  return (
    <nav className="navbar">
      <span className="brand">Paper Trading</span>
      {user && (
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/stocks">Stocks</NavLink>
          <NavLink to="/trade">Buy / Sell</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
        </>
      )}
      <span className="spacer" />
      {user ? (
        <>
          <span>{user.email}</span>
          <a href="#" onClick={(e) => { e.preventDefault(); handleCopyToken(); }}>Copy token</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </nav>
  );
}