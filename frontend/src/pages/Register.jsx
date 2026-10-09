import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Demo only. Cognito registration is added in Phase 3.");
    navigate("/login");
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label>Email
        <input type="email" required placeholder="you@example.com" />
      </label>
      <label>Password
        <input type="password" required minLength={8} placeholder="Min 8 characters" />
      </label>
      <button type="submit">Create account</button>
    </form>
  );
}