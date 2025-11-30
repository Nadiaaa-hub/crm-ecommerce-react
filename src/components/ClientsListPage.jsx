import { useNavigate } from "react-router-dom";
import "../styles/ClientsListPage.css";

export default function ClientsListPage({ clients = [] }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/client-card/${id}`);
  };
  return (
    <div className="clients-wrapper">
      <h1 className="clients-title">Clients</h1>

      <button
        className="add-client-btn"
        onClick={() => navigate("/add-clients-page")}>
        Add Client
      </button>

      {!clients.length ? (
        <p className="no-clients">No clients</p>
      ) : (
        <table className="clients-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="client-row"
                onClick={() => handleClick(client.id)}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
                <td>
                  <button
                    className="open-btn"
                    onClick={() => {
                      navigate(`/client-card/${client.id}`);
                    }}>
                    Open
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
