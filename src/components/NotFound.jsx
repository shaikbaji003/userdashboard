import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>This page doesn't seem to exist.</h2>
      <button onClick={handleRedirect}>Go to Dashboard</button>
    </div>
  );
};

export default Error;
