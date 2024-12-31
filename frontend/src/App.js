import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleUserLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); 
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/login"
            element={<LoginPage onLogin={handleUserLogin} />}
          />
          <Route
            path="/landing"
            element={
              user ? (
                <LandingPage user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
