import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./Context/AuthProvider";
import Box from "../components/Box";
import DisplayBox from "../components/DisplayBox";

const Home = () => {
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
      const userId = context.user?.uid;
      if (!userId) return;

      const q = query(
        collection(db, "cards", cardName, "entries"),
        where("userId", "==", userId)
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

    fetchEntries("Card for Vishal");
    fetchEntries("Card for Shweta");
    fetchEntries("Card for Rishi");
  }, [context.user, db]);

  const handleAddEntry = (cardName, newEntry) => {
    setEntries((prevEntries) => ({
      ...prevEntries,
      [cardName]: [...prevEntries[cardName], newEntry],
    }));
  };

  const handleDeleteEntry = (cardName, entryId) => {
    setEntries((prevEntries) => ({
      ...prevEntries,
      [cardName]: prevEntries[cardName].filter((entry) => entry.id !== entryId),
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
          <Box cardName="Card for Vishal" onAddEntry={handleAddEntry} />
          <Box cardName="Card for Shweta" onAddEntry={handleAddEntry} />
          <Box cardName="Card for Rishi" onAddEntry={handleAddEntry} />
        </div>
        <div className="row">
          <DisplayBox
            cardName="Card for Vishal"
            entries={entries["Card for Vishal"]}
            onDeleteEntry={handleDeleteEntry}
          />
          <DisplayBox
            cardName="Card for Shweta"
            entries={entries["Card for Shweta"]}
            onDeleteEntry={handleDeleteEntry}
          />
          <DisplayBox
            cardName="Card for Rishi"
            entries={entries["Card for Rishi"]}
            onDeleteEntry={handleDeleteEntry}
          />
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
