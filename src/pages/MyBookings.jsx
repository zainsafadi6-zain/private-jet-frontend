import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import fallbackJet from "../assets/jet-2.jpg";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [weather, setWeather] = useState({});
  const navigate = useNavigate();

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

  const checkWeather = async (e, booking) => {
    e.stopPropagation();

    try {
      const city = booking.destinationCity.toLowerCase();
      const res = await api.get(`/weather/${city}`);

      setWeather({
        ...weather,
        [booking._id]: res.data,
      });
    } catch (error) {
      alert("Weather data is not available for this city");
    }
  };

  return (
    <main className="journeys-page">
      <h1>My Journeys</h1>

      <div className="journey-list">
        {bookings.map((booking) => (
          <div
            className={`journey-card ${
              booking.status === "Confirmed" ? "clickable" : ""
            }`}
            key={booking._id}
            onClick={() => {
              if (booking.status === "Confirmed") {
                navigate(`/ticket/${booking._id}`);
              }
            }}
          >
            <img
              src={booking.jet?.image || fallbackJet}
              alt={booking.jet?.name || "Jet"}
              onError={(e) => {
                e.currentTarget.src = fallbackJet;
              }}
            />

            <div className="journey-info">
              <h2>{booking.jet?.name}</h2>
              <p>{booking.jet?.category}</p>

              <div className="journey-route">
                <span>🛫 {booking.departureCity}</span>
                <span>🛬 {booking.destinationCity}</span>
                <span>📅 {booking.departureDate?.slice(0, 10)}</span>
                <span>⏰ {booking.flightTime}</span>
                <span>{booking.tripType}</span>
                <span>{booking.passengers} passengers</span>
              </div>

              <button
                className="weather-btn"
                onClick={(e) => checkWeather(e, booking)}
              >
                Check Destination Weather
              </button>

              {weather[booking._id] && (
                <div className="weather-box">
                  <span>🌤 {weather[booking._id].city}</span>
                  <span>Temp: {weather[booking._id].temperature}°C</span>
                  <span>Wind: {weather[booking._id].windSpeed} km/h</span>
                </div>
              )}
            </div>

            <div className="journey-price">
              <span className={`journey-status ${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>

              <h3>${booking.totalPrice?.toLocaleString()}</h3>

              {booking.status === "Confirmed" && (
                <p className="ticket-hint">Click to view ticket</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MyBookings;