// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/AddClientForm.css";

// export default function AddClientForm({ clients = [], onAddClient }) {
//   const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const fields = [
//     { name: "name", placeholder: "Enter name" },
//     { name: "email", placeholder: "Enter email" },
//     { name: "phone", placeholder: "Enter phone" },
//   ];

//   const formatDate = (date) => {
//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newClient = {
//       ...formData,
//       registrationDate: formatDate(new Date()),
//     };
//     onAddClient(newClient);
//     setFormData({ name: "", phone: "", email: "" });
//     navigate("/clients");
//   };

//   return (
//     <div className="container">
//       <form className="form-container" onSubmit={handleSubmit}>
//         <h3>Add New Client</h3>
//         {fields.map(({ name, placeholder }) => (
//           <input
//             className="form-input"
//             key={name}
//             name={name}
//             placeholder={placeholder}
//             value={formData[name]}
//             onChange={handleChange}
//           />
//         ))}

//         <button className="form-btn" type="submit">
//           Add Client
//         </button>
//       </form>
//     </div>
//   );
// }import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddClientForm({ onAddClient }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = {
      ...formData,
      registrationDate: new Date().toISOString(),
      orders: [],
    };
    await onAddClient(client);
    setFormData({ name: "", email: "", phone: "" });
    navigate("/clients");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <button type="submit">Add Client</button>
    </form>
  );
}
