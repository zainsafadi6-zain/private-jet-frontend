import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="client-home-page">
      <section className="client-search-panel">
        <h1>Welcome to EliteJet</h1>
        <p>Search for available private aircraft and manage your journeys.</p>

        <div className="client-flight-search">
          <input placeholder="Departure Airport" />
          <input placeholder="Destination Airport" />

          <select>
            <option>All Categories</option>
            <option>Light</option>
            <option>Midsize</option>
            <option>Heavy</option>
            <option>Ultra-Long-Range</option>
          </select>

          <button onClick={() => navigate("/fleet")}>Search Fleet</button>
        </div>

        <div className="client-search-notes">
          <span>• Jets available now</span>
          <span>• Worldwide coverage</span>
          <span>• Instant request</span>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;