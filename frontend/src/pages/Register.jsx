import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Register() {
  const { register, confirm, resendCode } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(email.trim(), password);
      setStep("confirm");
      setInfo("A verification code was sent to your email.");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await confirm(email.trim(), code.trim());
      alert("Email confirmed. You can now log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Confirmation failed");
    } finally {
      setBusy(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await resendCode(email.trim());
      setInfo("A new code was sent.");
    } catch (err) {
      setError(err.message || "Could not resend code");
    }
  };

  if (step === "confirm") {
    return (
      <form className="form-box" onSubmit={handleConfirm}>
        <h2>Confirm email</h2>
        {info && <p>{info}</p>}
        {error && <p className="loss">{error}</p>}
        <label>Verification code
          <input required value={code} onChange={(e) => setCode(e.target.value)} />
        </label>
        <button type="submit" disabled={busy}>{busy ? "Checking..." : "Confirm"}</button>
        <button type="button" onClick={handleResend} style={{ marginLeft: 10, background: "#64748b" }}>
          Resend code
        </button>
      </form>
    );
  }

  return (
    <form className="form-box" onSubmit={handleRegister}>
      <h2>Register</h2>
      {error && <p className="loss">{error}</p>}
      <label>Email
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>Password
        <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        Min 8 characters, with upper and lower case letters, a number and a symbol.
      </p>
      <button type="submit" disabled={busy}>{busy ? "Creating..." : "Create account"}</button>
    </form>
  );
}