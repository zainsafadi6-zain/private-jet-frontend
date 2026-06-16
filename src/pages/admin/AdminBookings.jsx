import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const route = `${booking.departureCity} ${booking.destinationCity}`;
    const matchSearch = route.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || booking.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/bookings/${id}/status`, { status: newStatus });
      fetchBookings();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete booking");
    }
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
            <th>Client</th>
            <th>Aircraft</th>
            <th>Route</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.client?.name}</td>
              <td>{booking.jet?.name}</td>
              <td>
                <strong>
                  {booking.departureCity} → {booking.destinationCity}
                </strong>
              </td>
              <td>{booking.departureDate?.slice(0, 10)}</td>
              <td className="gold">${booking.totalPrice?.toLocaleString()}</td>
              <td>
                <select
                  className={`status-select ${booking.status.toLowerCase()}`}
                  value={booking.status}
                  onChange={(e) => updateStatus(booking._id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                </select>
              </td>
              <td className="actions">
                <button onClick={() => deleteBooking(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default AdminBookings;