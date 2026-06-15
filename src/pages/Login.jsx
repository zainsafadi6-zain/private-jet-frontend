import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroJet from "../assets/hero-jet.jpg";

function Login() {
  const [role, setRole] = useState("client");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("userRole", role);
    localStorage.setItem("isLoggedIn", "true");

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
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
          <input type="email" placeholder="your@email.com" required />

          <label>PASSWORD</label>
          <input type="password" placeholder="Enter password" required />

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