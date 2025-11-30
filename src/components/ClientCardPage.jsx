import { useParams, useNavigate } from "react-router-dom";
import "../styles/ClientCardPage.css";

export default function ClientCardPage({ clients = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const clientId = Number(id);

  const client = clients.find((client) => client.id === clientId);

  return (
    <div className="client-card">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>

      {!client ? (
        <p>Client with id {clientId} not found</p>
      ) : (
        <>
          <h2>{client.name}</h2>
          <p>id: {client.id}</p>
          <p>Phone: {client.phone}</p>
          <p>Email: {client.email}</p>
          <p>Registered: {client.registrationDate}</p>
        </>
      )}
    </div>
  );
}
