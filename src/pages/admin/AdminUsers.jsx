import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/auth/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  const deleteUser = async (id) => {
    try {
      await api.delete(`/auth/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete user");
    }
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
          <option>client</option>
          <option>admin</option>
        </select>

        <span className="result-count">{filteredUsers.length} users</span>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>
                <strong>{user.name}</strong>
              </td>

              <td>{user.email}</td>

              <td>
                <span className="status active">{user.role}</span>
              </td>

              <td>{user.createdAt?.slice(0, 10)}</td>

              <td className="actions">
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default AdminUsers;