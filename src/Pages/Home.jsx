import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Pages/Context/AuthProvider";
import Box from "../components/Box";
import DisplayBox from "../components/DisplayBox";

const Home = () => {
  const cardName1 = "Card for Vishal";
  const cardName2 = "Card for Shweta";
  const cardName3 = "Card for Rishi";
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const { context } = useAuthContext();
  const [entries, setEntries] = useState({
    "Card for Vishal": [],
    "Card for Shweta": [],
    "Card for Rishi": [],
  });

  const handleLogout = () => {
    signOut(auth);
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchEntries = async (cardName) => {
      const userId = context.user?.uid; // Get the user ID from context
      if (!userId) return; // If not authenticated, do not fetch data

      const q = query(
        collection(db, "cards", cardName, "entries"),
        where("userId", "==", userId) // Fetch documents where userId matches
      );
      const querySnapshot = await getDocs(q);
      const fetchedEntries = [];
      querySnapshot.forEach((doc) => {
        fetchedEntries.push({ id: doc.id, ...doc.data() });
      });
      setEntries((prevEntries) => ({
        ...prevEntries,
        [cardName]: fetchedEntries,
      }));
    };

    // Fetch entries for all cards
    fetchEntries(cardName1);
    fetchEntries(cardName2);
    fetchEntries(cardName3);
  }, [context.user, db]);

  const handleAddEntry = (cardName, newEntry) => {
    setEntries((prevEntries) => ({
      ...prevEntries,
      [cardName]: [...prevEntries[cardName], newEntry],
    }));
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
          <Box cardName={cardName1} onAddEntry={handleAddEntry} />
          <Box cardName={cardName2} onAddEntry={handleAddEntry} />
          <Box cardName={cardName3} onAddEntry={handleAddEntry} />
        </div>
        <div className="row">
          <DisplayBox cardName={cardName1} entries={entries[cardName1]} />
          <DisplayBox cardName={cardName2} entries={entries[cardName2]} />
          <DisplayBox cardName={cardName3} entries={entries[cardName3]} />
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
