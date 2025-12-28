import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Button from "./Button";
import logo from "../img/logo.png";
import "../styles/AuthPage.css";

export default function AuthPage() {
  const { loginEmail, signUpEmail, loginGoogle } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      if (mode === "login") await loginEmail(email, password);
      else await signUpEmail(email, password);

      navigate("/profile");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        alert("Email already used, try login");
        setMode("login");
      } else {
        alert(err.message);
      }
    }
  };

  const handleGoogle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await loginGoogle();
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="Shop Flow Logo" />
        </div>

        <h2 className="auth-title">
          {mode === "login" ? "Sign in" : "Create an account"}
        </h2>

        <div className="auth-mode-switch">
          <button
            onClick={() => setMode("login")}
            className={mode === "login" ? "active" : "inactive"}>
            Sign in
          </button>
          <button
            onClick={() => setMode("register")}
            className={mode === "register" ? "active" : "inactive"}>
            Sign up
          </button>
        </div>

        <div className="auth-form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button className="auth-submit" onClick={handleEmail}>
          {mode === "login" ? "Sign in" : "Create account"}
        </button>

        <div className="auth-divider">
          <div></div>
          <div>or</div>
          <div></div>
        </div>

        <Button onClick={handleGoogle} disabled={loading}>
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
          />
          Continue with Google
        </Button>

        <div className="auth-footer">
          <div>
            {mode === "login" ? "New here?" : "Already have account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
