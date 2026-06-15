import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        ELITEJET
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/fleet">Fleet</Link>
      </div>

      <Link className="signin-btn" to="/login">
        Sign In
      </Link>
    </nav>
  );
}

export default Navbar;