import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroJet from "../assets/hero-jet.jpg";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message || "Registration failed");
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
          <p>"Private aviation, reimagined for the modern era."</p>
          <span>Create your account and start managing your charter experience.</span>
        </div>
      </section>

      <section className="login-right">
        <form className="login-pro-card" onSubmit={handleRegister}>
          <h1>Create account</h1>
          <p>Join EliteJet and request premium private aircraft charters.</p>

          <label>FULL NAME</label>
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>EMAIL ADDRESS</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>CONFIRM PASSWORD</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Create Account</button>

          <p className="auth-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;