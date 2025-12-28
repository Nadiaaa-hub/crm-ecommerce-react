import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "../styles/AuthPage.css"; // підключаємо CSS

export default function AuthPage() {
  const { loginWithEmail, signUpWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // 'login' або 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailAuth = async () => {
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      navigate("/profile");
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/profile");
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{mode === "login" ? "Sign In" : "Sign Up"}</h2>

        <div className="auth-mode-switch">
          <button
            onClick={() => setMode("login")}
            className={mode === "login" ? "active" : ""}>
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={mode === "register" ? "active" : ""}>
            Register
          </button>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        <button onClick={handleEmailAuth} className="auth-btn email-btn">
          {mode === "login" ? "Sign In with Email" : "Sign Up with Email"}
        </button>
        <button onClick={handleGoogleLogin} className="auth-btn google-btn">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
