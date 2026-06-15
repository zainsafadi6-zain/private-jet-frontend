function Dashboard() {
  const bookings = [
    {
      id: 1,
      aircraft: "Bombardier Global 7500",
      route: "Amman → London",
      date: "2026-07-12",
      status: "Pending",
    },
    {
      id: 2,
      aircraft: "Gulfstream G700",
      route: "Dubai → Paris",
      date: "2026-08-02",
      status: "Confirmed",
    },
    {
      id: 3,
      aircraft: "Embraer Phenom 300E",
      route: "Amman → Riyadh",
      date: "2026-06-20",
      status: "Completed",
    },
  ];

  return (
    <main className="client-dashboard">
      <div className="dashboard-header">
        <p className="section-label">CLIENT PORTAL</p>
        <h1>My Dashboard</h1>
        <p>Track your private jet requests and upcoming charter flights.</p>
      </div>

      <div className="client-stats-grid">
        <div className="client-stat-card">
          <span>Total Bookings</span>
          <h2>3</h2>
        </div>

        <div className="client-stat-card">
          <span>Pending Flights</span>
          <h2>1</h2>
        </div>

        <div className="client-stat-card">
          <span>Confirmed Flights</span>
          <h2>1</h2>
        </div>

        <div className="client-stat-card">
          <span>Completed Flights</span>
          <h2>1</h2>
        </div>
      </div>

      <section className="dashboard-panel">
        <h2>My Flight Requests</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Aircraft</th>
              <th>Route</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <strong>{booking.aircraft}</strong>
                </td>
                <td>{booking.route}</td>
                <td>{booking.date}</td>
                <td>
                  <span className={`client-status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Dashboard;