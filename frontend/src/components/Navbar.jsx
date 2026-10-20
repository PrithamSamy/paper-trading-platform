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
      alert("Access token copied. Do not share it.");
    } catch {
      alert("Could not copy the token. Try logging in again.");
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
          <NavLink to="/orders">Orders</NavLink>
        </>
      )}

      <span className="spacer" />

      {user ? (
        <>
          <span className="nav-email">{user.email}</span>

          <button
            type="button"
            className="nav-button"
            onClick={handleCopyToken}
          >
            Copy token
          </button>

          <button
            type="button"
            className="nav-button"
            onClick={handleLogout}
          >
            Logout
          </button>
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