import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Demo only. Cognito login is added in Phase 3.");
    navigate("/dashboard");
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>Email
        <input type="email" required placeholder="you@example.com" />
      </label>
      <label>Password
        <input type="password" required placeholder="Password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}