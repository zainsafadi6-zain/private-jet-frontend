import { Link } from "react-router-dom";
import heroJet from "../assets/hero-jet.jpg";

function Login() {
  return (
    <main className="login-pro-page">
      <section
        className="login-left"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.75)), url(${heroJet})`,
        }}
      >
        <h2>ELITEJET</h2>
        <p>"The sky is not the limit when you travel on your own terms."</p>
      </section>

      <section className="login-right">
        <form className="login-pro-card">
          <h1>Welcome back</h1>
          <p>Sign in to access your EliteJet account.</p>

          <label>SIGN IN AS</label>

          <div className="role-box active">
            <strong>Client</strong>
            <span>Search and book private jets</span>
          </div>

          <div className="role-box">
            <strong>Administrator</strong>
            <span>Platform oversight and control</span>
          </div>

          <label>EMAIL ADDRESS</label>
          <input type="email" placeholder="your@email.com" />

          <label>PASSWORD</label>
          <input type="password" placeholder="Enter password" />

          <button type="button">Continue</button>

          <p className="auth-link">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;