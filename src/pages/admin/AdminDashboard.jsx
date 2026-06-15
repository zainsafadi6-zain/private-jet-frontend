function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: "128", note: "+12 this month" },
    { title: "Total Jets", value: "24", note: "18 available" },
    { title: "Total Bookings", value: "356", note: "42 pending" },
    { title: "Revenue", value: "$1.2M", note: "This quarter" },
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
          <p>New York → London</p>
          <p>Los Angeles → Paris</p>
          <p>Dubai → Amman</p>
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