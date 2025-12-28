
import React from "react";
import "../styles/AuthPage.css";

const Button = ({ children, className = "", ...rest }) => {
  return (
    <button className={`auth-button ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
