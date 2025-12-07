import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ClientsListPage.css";

export default function ClientsListPage({ clients = [], deleteClient }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filterClients = clients.filter(
    (client) =>
      client.name &&
      client.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="clients-wrapper container">
      <h1 className="clients-title">Clients</h1>

      <div className="controls-bar">
        <button className="client-row" onClick={() => navigate("/add-clients")}>
          Add Client
        </button>
        <input
          className="search-input "
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {!filterClients.length ? (
        <p className="no-clients">
          {search ? `No clients found for "${search}"` : "No clients"}
        </p>
      ) : (
        <table className="clients-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filterClients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
                <td>
                  <button
                    className="open-btn "
                    onClick={() => navigate(`/clients/${client.id}`)}>
                    Open
                  </button>
                  <button
                    className="delete-btn "
                    onClick={() => deleteClient(client.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
