import { Link } from "react-router-dom";
import heroJet from "../assets/hero-jet.jpg";

function Register() {
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
        <form className="login-pro-card">
          <h1>Create account</h1>
          <p>Join EliteJet and request premium private aircraft charters.</p>

          <label>FULL NAME</label>
          <input type="text" placeholder="Your full name" />

          <label>EMAIL ADDRESS</label>
          <input type="email" placeholder="your@email.com" />

          <label>PASSWORD</label>
          <input type="password" placeholder="Create password" />

          <label>CONFIRM PASSWORD</label>
          <input type="password" placeholder="Confirm password" />

          <button type="button">Create Account</button>

          <p className="auth-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;