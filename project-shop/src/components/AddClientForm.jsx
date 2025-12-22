// import { useState } from "react";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import "../styles/AddClientForm.css";
// import { useClients } from "../context/ClientsContext";

// export default function AddClientForm() {
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
//   const navigate = useNavigate();
//   const { addClient } = useClients();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

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
//     addClient({ ...formData, registrationDate: formatDate(new Date()) });
//     setFormData({ name: "", email: "", phone: "" });
//     navigate("/clients");
//   };

//   return (
//     <div className="container">
//       <form className="form-container" onSubmit={handleSubmit}>
//         <h3>Add New Client</h3>
//         {["name", "email", "phone"].map((field) => (
//           <input
//             key={field}
//             className="form-input"
//             name={field}
//             placeholder={`Enter ${field}`}
//             value={formData[field]}
//             onChange={handleChange}
//           />
//         ))}
//         <button className="form-btn" type="submit">
//           Add Client
//         </button>
//       </form>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import "../styles/AddClientForm.css";
import { useClients } from "../context/ClientsContext";

export default function AddClientForm() {
  const [phoneCode, setPhone] = useState("+380");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const { addClient } = useClients();

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

  const countries = [
    { code: "+380", name: "Ukraine" },
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
  ];

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneCode: "+380",
          phoneNumber: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          } else if (
            !/^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']{1,}(\s[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']{1,})*$/.test(
              values.name
            )
          ) {
            errors.name = "Must start ONLY with uppercase letter";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.phoneNumber) {
            errors.phoneNumber = "Required";
          } else if (!/^\d{7,}$/.test(values.phoneNumber)) {
            errors.phoneNumber = "Phone must be at least 7 digits";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          addClient({
            name: values.name,
            email: values.email,
            phone: values.phoneCode + values.phoneNumber,
            registrationDate: formatDate(new Date()),
          });
          resetForm();
          setSubmitting(false);
          navigate("/clients");
        }}>
        {({ values, handleChange, isSubmitting }) => (
          <Form className="form-container">
            <div className="form-field">
              <Field
                type="text"
                name="name"
                placeholder="Enter name"
                className="form-input"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-field">
              <Field
                type="email"
                name="email"
                placeholder="Enter email"
                className="form-input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="form-error"
              />
            </div>

            <div
              className="form-field"
              style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <select
                name="phoneCode"
                value={values.phoneCode}
                onChange={handleChange}
                className="form-input"
                style={{ maxWidth: "100px" }}>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
              <Field
                type="tel"
                name="phoneNumber"
                placeholder="1234567"
                className="form-input"
              />
            </div>
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="form-error"
            />

            <button type="submit" className="form-btn" disabled={isSubmitting}>
              Add Client
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
