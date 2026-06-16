import { useEffect, useState } from "react";
import api from "../api/axios";
import fallbackJet from "../assets/jet-2.jpg";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my-bookings");
        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main className="journeys-page">
      <h1>My Journeys</h1>

      <div className="journey-list">
        {bookings.map((booking) => (
          <div className="journey-card" key={booking._id}>
        <img
  src={booking.jet?.image || fallbackJet}
  alt={booking.jet?.name || "Jet"}
  onError={(e) => {
    e.currentTarget.src = fallbackJet;
  }}
/>

            <div className="journey-info">
              <h2>{booking.jet.name}</h2>
              <p>{booking.jet.category}</p>

              <div className="journey-route">
                <span>🛫 {booking.departureCity}</span>
                <span>🛬 {booking.destinationCity}</span>
                <span>📅 {booking.departureDate?.slice(0, 10)}</span>
                <span>{booking.passengers} passengers</span>
              </div>
            </div>

            <div className="journey-price">
              <span className={`journey-status ${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>

              <h3>${booking.totalPrice.toLocaleString()}</h3>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MyBookings;