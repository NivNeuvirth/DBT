import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Registration Successful!</h1>
      <p>Welcome to our website.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Success;
