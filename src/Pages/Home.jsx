import React from "react";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./Context/AuthProvider";
import Box from "../components/Box";
import DisplayBox from "../components/DisplayBox";

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const { context } = useAuthContext();

  const handleLogout = () => {
    signOut(auth);
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Hello {context.user?.displayName || context.user?.email}!</h1>
      <div
        style={{
          margin: "20px auto",
          inlineSize: "100px",
          blockSize: "100px",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img
          src="https://via.placeholder.com/100" // Replace with actual profile picture URL
          alt="Profile"
          style={{ inlineSize: "100%", blockSize: "auto" }}
        />
      </div>

      <div className="container">
        <div className="row">
          <Box cardName="Card for Vishal" />
          <Box cardName="Card for Shweta" />
          <Box cardName="Card for Rishi" />
        </div>
        <div className="row">
          <DisplayBox cardName="Card for Vishal" />
          <DisplayBox cardName="Card for Shweta" />
          <DisplayBox cardName="Card for Rishi" />
        </div>
      </div>

      <button
        className="btn btn-primary"
        style={{ textAlign: "center" }}
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;