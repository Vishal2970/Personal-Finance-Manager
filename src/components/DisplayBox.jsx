import React from "react";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import app from "../firebase";

function DisplayBox({ cardName, entries, onDeleteEntry }) {
  const db = getFirestore(app);

  const handleDelete = async (entryId) => {
    try {
      await deleteDoc(doc(db, "cards", cardName, "entries", entryId));
      onDeleteEntry(cardName, entryId); // Notify parent component to remove the entry
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Failed to delete entry");
    }
  };

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
              <li key={entry.id}>
                {entry.content}
                <button
                  style={{ insetInlineStart: "10px" }}
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(entry.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DisplayBox;
