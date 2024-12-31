import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login"); 
    } else {
      setUser(JSON.parse(userData)); 
    }
  }, [navigate]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  if (!user) return <p>Loading...</p>; 

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>
        {getGreeting()}, Mr. {user.firstName} {user.lastName}!
      </h1>

      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#f04e4e",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default LandingPage;
