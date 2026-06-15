import { useState } from "react";
import { jets } from "../../data/jets";

function AdminJets() {
  const emptyForm = {
    name: "",
    category: "Light",
    owner: "EliteJet",
    seats: "",
    speed: "",
    range: "",
    price: "",
  };

  const [fleet, setFleet] = useState(jets);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredJets = fleet.filter((jet) =>
    jet.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (jet) => {
    setEditingId(jet.id);
    setFormData({
      name: jet.name,
      category: jet.category,
      owner: jet.owner,
      seats: jet.seats,
      speed: jet.speed,
      range: jet.range,
      price: jet.price,
    });
    setShowForm(true);
  };

  const saveJet = (e) => {
    e.preventDefault();

    if (editingId) {
      setFleet(
        fleet.map((jet) =>
          jet.id === editingId
            ? {
                ...jet,
                ...formData,
                seats: Number(formData.seats),
                speed: Number(formData.speed),
                price: Number(formData.price),
              }
            : jet
        )
      );
    } else {
      const newJet = {
        id: Date.now(),
        ...formData,
        seats: Number(formData.seats),
        speed: Number(formData.speed),
        price: Number(formData.price),
        image: jets[0].image,
        description: "New aircraft added by admin.",
      };

      setFleet([newJet, ...fleet]);
    }

    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const deleteJet = (id) => {
    setFleet(fleet.filter((jet) => jet.id !== id));
  };

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <p className="section-label">ADMIN</p>
          <h1>Global Fleet</h1>
        </div>

        <button className="gold-btn" onClick={showForm ? () => setShowForm(false) : openAddForm}>
          {showForm ? "Close Form" : "+ Add Aircraft"}
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={saveJet}>
          <h2>{editingId ? "Edit Aircraft" : "Add New Aircraft"}</h2>

          <div className="form-grid">
            <input name="name" placeholder="Aircraft Name" value={formData.name} onChange={handleChange} required />

            <select name="category" value={formData.category} onChange={handleChange}>
              <option>Light</option>
              <option>Midsize</option>
              <option>Heavy</option>
              <option>Ultra-Long-Range</option>
            </select>

            <input name="owner" placeholder="Owner" value={formData.owner} onChange={handleChange} required />
            <input name="seats" type="number" placeholder="Seats" value={formData.seats} onChange={handleChange} required />
            <input name="speed" type="number" placeholder="Speed" value={formData.speed} onChange={handleChange} required />
            <input name="range" placeholder="Range" value={formData.range} onChange={handleChange} required />
            <input name="price" type="number" placeholder="Price per hour" value={formData.price} onChange={handleChange} required />
          </div>

          <button className="gold-btn" type="submit">
            {editingId ? "Update Aircraft" : "Save Aircraft"}
          </button>
        </form>
      )}

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
              <td><span className="status active">available</span></td>
              <td className="actions">
                <button onClick={() => openEditForm(jet)}>Edit</button>
                <button onClick={() => deleteJet(jet.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default AdminJets;