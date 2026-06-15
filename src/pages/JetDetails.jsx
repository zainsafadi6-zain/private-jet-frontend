import { useParams } from "react-router-dom";
import { jets } from "../data/jets";

function JetDetails() {
  const { id } = useParams();
  const jet = jets.find((item) => item.id === Number(id));

  if (!jet) {
    return <h1 className="not-found">Jet Not Found</h1>;
  }

  return (
    <main className="details-page">
      <div className="details-grid">
        <div className="details-image">
          <img src={jet.image} alt={jet.name} />
        </div>

        <div className="details-content">
          <p className="section-label">{jet.category}</p>
          <h1>{jet.name}</h1>
          <p className="details-description">{jet.description}</p>

          <div className="spec-grid">
            <div>
              <span>Seats</span>
              <strong>{jet.seats}</strong>
            </div>
            <div>
              <span>Speed</span>
              <strong>{jet.speed} kts</strong>
            </div>
            <div>
              <span>Range</span>
              <strong>{jet.range}</strong>
            </div>
            <div>
              <span>Price</span>
              <strong>${jet.price.toLocaleString()}/hr</strong>
            </div>
          </div>

          <form className="booking-form">
            <h2>Request Charter</h2>

            <input type="text" placeholder="Departure City" />
            <input type="text" placeholder="Destination City" />
            <input type="date" />
            <input type="number" placeholder="Passengers" min="1" />

            <button type="button">Submit Request</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default JetDetails;