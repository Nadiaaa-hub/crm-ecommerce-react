import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddClientForm.css";

export default function AddClientForm({ clients = [], onAddClient }) {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fields = [
    ["name", "Name"],
    ["phone", "Phone"],
    ["email", "Email"],
  ];

  const formatDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId =
      clients.reduce((acc, client) => Math.max(acc, client.id), 0) + 1;
    const newClient = {
      id: newId,
      ...formData,
      registrationDate: formatDate(new Date()),
      orders: [],
    };
    onAddClient(newClient);
    setFormData({ name: "", phone: "", email: "" });
    navigate("/clients-page");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Add New Client</h3>
      {fields.map(([name, placeholder]) => (
        <input
          key={name}
          name={name}
          className="form-input"
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
        />
      ))}
      <button className="form-btn" type="submit">
        Add Client
      </button>
    </form>
  );
}
