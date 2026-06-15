import { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Client",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Client",
    status: "Active",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@elitejet.com",
    role: "Admin",
    status: "Active",
  },
];

function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Suspended"
                  : "Active",
            }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <p className="section-label">ADMIN</p>
          <h1>Manage Users</h1>
        </div>
      </div>

      <div className="admin-tools">
        <input
          className="admin-search"
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="admin-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option>All</option>
          <option>Client</option>
          <option>Admin</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <strong>{user.name}</strong>
              </td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>
                <span
                  className={
                    user.status === "Active"
                      ? "status active"
                      : "status suspended"
                  }
                >
                  {user.status}
                </span>
              </td>

              <td className="actions">
                <button onClick={() => toggleStatus(user.id)}>
                  {user.status === "Active"
                    ? "Suspend"
                    : "Activate"}
                </button>

                <button onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default AdminUsers;