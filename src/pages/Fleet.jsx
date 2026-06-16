import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const categories = ["All", "Light", "Midsize", "Heavy", "Ultra-Long-Range"];

function Fleet() {
  const [jets, setJets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchJets = async () => {
      try {
        const res = await api.get("/jets");
        setJets(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJets();
  }, []);

  const filteredJets =
    selectedCategory === "All"
      ? jets
      : jets.filter((jet) => jet.category === selectedCategory);
const fallbackImages = [
  "/src/assets/jet-2.jpg",
  "/src/assets/jet-3.jpg",
  "/src/assets/hero-jet.jpg",
];
  return (
    <main className="fleet-page">
      <p className="section-label">PRIVATE FLEET</p>
      <h1>Browse Aircraft</h1>

      <p className="fleet-intro">
        Every aircraft on our platform has been individually verified and
        certified. Filter by class to find your perfect match.
      </p>

      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="jet-grid">
        {filteredJets.map((jet, index) => (
          <Link to={`/fleet/${jet._id}`} className="jet-card" key={jet._id}>
            <div className="jet-image-wrap">
             <img src={fallbackImages[index % fallbackImages.length]} alt={jet.name} />
              <span>{jet.category}</span>
            </div>

            <div className="jet-card-body">
              <div className="jet-title-row">
                <div>
                  <h2>{jet.name}</h2>
                  <p>{jet.owner || "EliteJet"}</p>
                </div>

                <div className="price">
                  ${jet.price.toLocaleString()}
                  <small>per hour</small>
                </div>
              </div>

              <div className="jet-meta">
                <span>👥 {jet.seats} Seats</span>
                <span>🕘 {jet.speed} kts</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Fleet;