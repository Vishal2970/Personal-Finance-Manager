import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import app from "../firebase";
import { useAuthContext } from "../Pages/Context/AuthProvider";

function DisplayBox({ cardName }) {
  const [entries, setEntries] = useState([]);
  const db = getFirestore(app);
  const { context } = useAuthContext();

  useEffect(() => {
    const fetchEntries = async () => {
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
      setEntries(fetchedEntries);
    };

    fetchEntries();
  }, [cardName, context.user, db]);

  return (
    <div className="col-md-4">
      <div
        className="card"
        style={{
          padding: "20px",
          margin: "10px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{cardName}</h5>
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>{entry.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DisplayBox;
