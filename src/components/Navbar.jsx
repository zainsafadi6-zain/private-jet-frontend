import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ELITEJET
      </Link>

      <div className="links">
        {!isLoggedIn && (
          <>
            <Link to="/">Home</Link>
            <Link to="/fleet">Fleet</Link>
          </>
        )}

        {isLoggedIn && role === "client" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/fleet">Fleet</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </>
        )}

        {isLoggedIn && role === "admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/jets">Manage Jets</Link>
            <Link to="/admin/bookings">Bookings</Link>
            <Link to="/admin/users">Users</Link>
          </>
        )}
      </div>

      {!isLoggedIn ? (
        <Link className="signin-btn" to="/login">
          Sign In
        </Link>
      ) : (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;