import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../context/AuthProvider";
import Button from "./Button";
import logo from "../img/logo.png";
import "../styles/AuthPage.css";

export default function AuthPage() {
  const { loginWithEmail, signUpWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="Shop Flow Logo" />
        </div>

        <h2 className="auth-title">Sign in / Sign up</h2>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.firstName && !values.lastName) {
              errors.firstName = "Required for sign up";
              errors.lastName = "Required for sign up";
            }

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 6) {
              errors.password = "Password must be at least 6 characters";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (values.firstName || values.lastName) {
                const cred = await signUpWithEmail(
                  values.email,
                  values.password
                );
                await cred.user.updateProfile({
                  displayName: `${values.firstName} ${values.lastName}`,
                });
              } else {
                await loginWithEmail(values.email, values.password);
              }
              navigate("/profile");
            } catch (err) {
              console.log(err);
              if (err.code === "auth/email-already-in-use") {
                alert("Email already used, try login");
              } else {
                alert(err.message);
              }
            }
            setSubmitting(false);
          }}>
          {({ errors, touched, isSubmitting }) => (
            <Form className="auth-form">
              <label>First Name</label>
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`form-input ${
                  errors.firstName && touched.firstName ? "error" : ""
                }`}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="form-error"
              />

              <label>Last Name</label>
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`form-input ${
                  errors.lastName && touched.lastName ? "error" : ""
                }`}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="form-error"
              />

              <label>Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={`form-input ${
                  errors.email && touched.email ? "error" : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="form-error"
              />

              <label>Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={`form-input ${
                  errors.password && touched.password ? "error" : ""
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="form-error"
              />

              <button
                type="submit"
                className="auth-submit"
                disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>

        <div className="auth-divider">
          <div></div>
          <div>or</div>
          <div></div>
        </div>

        <Button onClick={handleGoogle}>
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
          />
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
