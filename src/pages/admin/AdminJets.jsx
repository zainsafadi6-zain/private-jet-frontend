import { useState } from "react";
import { jets } from "../../data/jets";

function AdminJets() {
  const [search, setSearch] = useState("");

  const filteredJets = jets.filter((jet) =>
    jet.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <p className="section-label">ADMIN</p>
          <h1>Global Fleet</h1>
        </div>

        <button className="gold-btn">+ Add Aircraft</button>
      </div>

      <input
        className="admin-search"
        type="text"
        placeholder="Search fleet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="admin-table">
        <thead>
          <tr>
            <th>Aircraft</th>
            <th>Category</th>
            <th>Seats</th>
            <th>Rate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredJets.map((jet) => (
            <tr key={jet.id}>
              <td>
                <strong>{jet.name}</strong>
                <span>{jet.owner}</span>
              </td>
              <td>{jet.category}</td>
              <td>{jet.seats}</td>
              <td className="gold">${jet.price.toLocaleString()}/hr</td>
              <td>
                <span className="status active">available</span>
              </td>
              <td className="actions">
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default AdminJets;