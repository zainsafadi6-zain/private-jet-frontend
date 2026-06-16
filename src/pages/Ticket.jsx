import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function Ticket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await api.get(`/bookings/${id}/ticket`);
        setTicket(res.data);
      } catch (error) {
        alert(error.response?.data?.message || "Ticket is not available yet");
      }
    };

    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <h1 className="not-found">Loading ticket...</h1>;
  }

  return (
    <main className="ticket-page">
      <section className="ticket-card">
        <div className="ticket-header">
          <h1>ELITEJET</h1>
          <span>BOARDING PASS</span>
        </div>

        <div className="ticket-route">
          <h2>{ticket.departureCity}</h2>
          <span>→</span>
          <h2>{ticket.destinationCity}</h2>
        </div>

        <div className="ticket-grid">
          <div>
            <span>Passenger</span>
            <strong>{ticket.client.name}</strong>
          </div>

          <div>
            <span>Aircraft</span>
            <strong>{ticket.jet.name}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{ticket.departureDate.slice(0, 10)}</strong>
          </div>

          <div>
            <span>Time</span>
            <strong>{ticket.flightTime}</strong>
          </div>

          <div>
            <span>Trip Type</span>
            <strong>{ticket.tripType}</strong>
          </div>

          <div>
            <span>Passengers</span>
            <strong>{ticket.passengers}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{ticket.status}</strong>
          </div>

          <div>
            <span>Total</span>
            <strong>${ticket.totalPrice.toLocaleString()}</strong>
          </div>
        </div>

        <p className="ticket-note">
          Your charter request has been confirmed by EliteJet administration.
        </p>
      </section>
    </main>
  );
}

export default Ticket;