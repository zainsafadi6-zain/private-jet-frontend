import { useState } from "react";

const initialBookings = [
  {
    id: 1,
    route: "New York, NY → London, UK",
    date: "2026-06-10",
    total: 50000,
    status: "Confirmed",
  },
  {
    id: 2,
    route: "Los Angeles, CA → Paris, France",
    date: "2026-07-01",
    total: 47200,
    status: "Pending",
  },
  {
    id: 3,
    route: "Las Vegas, NV → San Francisco, CA",
    date: "2026-05-30",
    total: 11200,
    status: "Cancelled",
  },
];

function AdminBookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredBookings = bookings.filter((booking) => {
    const matchSearch = booking.route.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || booking.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const deleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <p className="section-label">ADMIN</p>
          <h1>All Bookings</h1>
        </div>
      </div>

      <div className="admin-tools">
        <input
          className="admin-search"
          type="text"
          placeholder="Search routes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="admin-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
        </select>

        <span className="result-count">{filteredBookings.length} results</span>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Route</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td>#{booking.id}</td>
              <td>
                <strong>{booking.route}</strong>
              </td>
              <td>{booking.date}</td>
              <td className="gold">${booking.total.toLocaleString()}</td>
              <td>
                <select
                  className={`status-select ${booking.status.toLowerCase()}`}
                  value={booking.status}
                  onChange={(e) => updateStatus(booking.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                </select>
              </td>
              <td className="actions">
                <button onClick={() => deleteBooking(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default AdminBookings;