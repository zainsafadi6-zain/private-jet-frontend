import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function JetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jet, setJet] = useState(null);
  const [formData, setFormData] = useState({
    departureCity: "",
    destinationCity: "",
    departureDate: "",
    flightTime: "",
    tripType: "One Way",
    returnDate: "",
    passengers: 1,
  });

  useEffect(() => {
    const fetchJet = async () => {
      try {
        const res = await api.get(`/jets/${id}`);
        setJet(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJet();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      await api.post("/bookings", {
        jet: jet._id,
        departureCity: formData.departureCity,
        destinationCity: formData.destinationCity,
        departureDate: formData.departureDate,
        flightTime: formData.flightTime,
        tripType: formData.tripType,
        returnDate:
          formData.tripType === "Round Trip" ? formData.returnDate : null,
        passengers: Number(formData.passengers),
      });

      alert("Booking request submitted successfully");
      navigate("/my-bookings");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (!jet) {
    return <h1 className="not-found">Loading jet...</h1>;
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

          <form className="booking-form" onSubmit={handleBooking}>
            <h2>Request Charter</h2>

            <input
              name="departureCity"
              type="text"
              placeholder="Departure City"
              value={formData.departureCity}
              onChange={handleChange}
              required
            />

            <input
              name="destinationCity"
              type="text"
              placeholder="Destination City"
              value={formData.destinationCity}
              onChange={handleChange}
              required
            />

            <input
              name="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />

            <input
              name="flightTime"
              type="time"
              value={formData.flightTime}
              onChange={handleChange}
              required
            />

            <select
              name="tripType"
              value={formData.tripType}
              onChange={handleChange}
              required
            >
              <option>One Way</option>
              <option>Round Trip</option>
            </select>

            {formData.tripType === "Round Trip" && (
              <input
                name="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={handleChange}
                required
              />
            )}

            <input
              name="passengers"
              type="number"
              placeholder="Passengers"
              min="1"
              value={formData.passengers}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default JetDetails;