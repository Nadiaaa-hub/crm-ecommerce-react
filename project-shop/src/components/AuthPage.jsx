import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import Button from "./Button";
import logo from "../img/logo.png";
import "../styles/AuthPage.css";

export default function AuthPage() {
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleEmailSignUp = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      navigate("/profile");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        alert("Email вже використовується. Спробуй увійти через логін.");
      } else {
        alert(err.message);
      }
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
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
            if (!values.email) errors.email = "Required";
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            )
              errors.email = "Invalid email address";
            if (!values.password) errors.password = "Required";
            else if (values.password.length < 6)
              errors.password = "Password must be at least 6 characters";
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (values.firstName || values.lastName) {
              await handleEmailSignUp(
                values.email,
                values.password,
                values.firstName,
                values.lastName
              );
            } else {
              await handleEmailLogin(values.email, values.password);
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
