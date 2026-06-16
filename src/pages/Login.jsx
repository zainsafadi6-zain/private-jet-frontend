import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroJet from "../assets/hero-jet.jpg";
import api from "../api/axios";

function Login() {
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("isLoggedIn", "true");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="login-pro-page">
      <section
        className="login-left"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.58),rgba(0,0,0,.82)), url(${heroJet})`,
        }}
      >
        <div className="auth-brand">✈ ELITEJET</div>

        <div className="auth-quote">
          <p>"The sky is not the limit when you travel on your own terms."</p>
          <span>Private aviation, reimagined for the modern era.</span>
        </div>
      </section>

      <section className="login-right">
        <form className="login-pro-card" onSubmit={handleLogin}>
          <h1>Welcome back</h1>
          <p>Sign in to access your EliteJet account.</p>

          <label>SIGN IN AS</label>

          <div
            className={role === "client" ? "role-box active" : "role-box"}
            onClick={() => setRole("client")}
          >
            <strong>Client</strong>
            <span>Search and book private jets</span>
          </div>

          <div
            className={role === "admin" ? "role-box active" : "role-box"}
            onClick={() => setRole("admin")}
          >
            <strong>Administrator</strong>
            <span>Platform oversight and control</span>
          </div>

          <label>EMAIL ADDRESS</label>
          <input
            type="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Continue</button>

          <p className="auth-link">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;