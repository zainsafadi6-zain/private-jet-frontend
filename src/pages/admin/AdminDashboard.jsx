import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [jets, setJets] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersRes = await api.get("/auth/users");
        const jetsRes = await api.get("/jets");
        const bookingsRes = await api.get("/bookings");

        setUsers(usersRes.data);
        setJets(jetsRes.data);
        setBookings(bookingsRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardData();
  }, []);

  const pending = bookings.filter((b) => b.status === "Pending").length;
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;

  const revenue = bookings.reduce((sum, booking) => {
    return sum + (booking.totalPrice || 0);
  }, 0);

  const stats = [
    { title: "Total Users", value: users.length, note: "Registered users" },
    { title: "Total Jets", value: jets.length, note: "Aircraft in fleet" },
    { title: "Total Bookings", value: bookings.length, note: `${pending} pending` },
    { title: "Revenue", value: `$${revenue.toLocaleString()}`, note: `${confirmed} confirmed` },
  ];

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <p className="section-label">ADMIN OVERVIEW</p>
          <h1>Dashboard</h1>
        </div>
      </div>

      <div className="admin-stats-grid">
        {stats.map((item) => (
          <div className="admin-stat-card" key={item.title}>
            <p>{item.title}</p>
            <h2>{item.value}</h2>
            <span>{item.note}</span>
          </div>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        <div className="admin-panel-box">
          <h2>Recent Bookings</h2>

          {bookings.slice(0, 5).map((booking) => (
            <p key={booking._id}>
              {booking.departureCity} → {booking.destinationCity} | {booking.status}
            </p>
          ))}
        </div>

        <div className="admin-panel-box">
          <h2>Quick Actions</h2>
          <a href="/admin/jets">Manage Jets</a>
          <a href="/admin/bookings">Manage Bookings</a>
          <a href="/admin/users">Manage Users</a>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;