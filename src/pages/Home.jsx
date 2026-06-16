import heroJet from "../assets/hero-jet.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(${heroJet})`,
      }}
    >
      <div className="hero-content">
        <div className="hero-badge">✦ PRIVATE AVIATION REDEFINED</div>

        <h1>
          Fly Without <br />
          <span>Compromise</span>
        </h1>

        <p>
          Access the world's finest private aircraft. Charter on your terms,
          arrive on your schedule.
        </p>

        <div className="search-box">
          <input type="text" placeholder="Departure" />
          <input type="text" placeholder="Destination" />
          <input type="date" />

          <select>
            <option>Jet Class</option>
            <option>Light</option>
            <option>Midsize</option>
            <option>Heavy</option>
            <option>Ultra-Long-Range</option>
          </select>

            <button
          className="btn btn-warning"
          onClick={() => {
            const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

            if (!isLoggedIn) {
              alert("Please sign in or create an account first");
              navigate("/register");
              return;
            }

            navigate("/fleet");
          }}
        >
          ✈ SEARCH FLEET
        </button>
        </div>
      </div>
    </section>
  );
}

export default Home;