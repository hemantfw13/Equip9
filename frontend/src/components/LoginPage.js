import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:1010/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("Response:", result);

      if (result.msg === "Login Success") {
        alert("Login Successful!");
        localStorage.setItem("user", JSON.stringify(result.user));
        setTimeout(() => navigate("/landing"), 100); 
      } else {
        setError(result.msg || "Login failed!");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h2>Login</h2>
      <input
        name="mobile"
        value={formData.mobile}
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        placeholder="Mobile"
        required
        style={{
          padding: "10px",
          margin: "10px 0",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
        required
        style={{
          padding: "10px",
          margin: "10px 0",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <div style={{display:"flex",gap:"5rem"}}>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            flex: "1",
          }}
        >
          Register
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </form>
  );
};

export default LoginPage;
