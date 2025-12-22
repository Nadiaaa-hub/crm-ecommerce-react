import { useParams, useNavigate } from "react-router-dom";
import { useClients } from "../../context/ClientsContext";
import "../../styles/ClientCardPage.css";

export default function ClientCardPage() {
  const { id } = useParams();
  const { clients } = useClients();
  const navigate = useNavigate();

  const client = clients.find((c) => String(c.id) === id);

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>

      {!client ? (
        <p>Client with id {client.id} not found</p>
      ) : (
        <div className="client-card">
          <h2>{client.name}</h2> <p>ID: {client.id}</p>
          <p>Phone: {client.phone}</p> <p>Email: {client.email}</p>
          {/* <p>Registered: {client.registrationDate}</p>
          <h3>Order History ({client.orders.length})</h3>
          {client.orders.length > 0 ? (
            <ul>
              {client.orders.map((order) => (
                <li key={order.id}>
                  {order.date}: {order.product} - {order.sum}
                  грн ({order.status})
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders yet</p>
          )} */}
          <button
            type="button"
            className="add-btn"
            onClick={() => navigate("/orders")}>
            Add new order
          </button>
        </div>
      )}
    </div>
  );
}
