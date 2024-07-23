import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../firebase";
import { useAuthContext } from "../Pages/Context/AuthProvider";

function Box({ cardName }) {
  const [inputValue, setInputValue] = useState("");
  const db = getFirestore(app);
  const { context } = useAuthContext();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const userId = context.user?.uid; // Get the user ID from context
      if (!userId) throw new Error("User not authenticated");

      const docRef = await addDoc(
        collection(db, "cards", cardName, "entries"),
        {
          content: inputValue,
          userId: userId, // Add userId to the document
        }
      );
      console.log("Document written with ID: ", docRef.id);
      alert("Added to Firestore");
      setInputValue("");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert(`Failed to add to Firestore: ${e.message}`);
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
          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label className="form-label">Write to add</label>
              <br />
              <input
                type="text"
                style={{ boxSizing: "50px", margin: "10px" }}
                className="form-control"
                id="input1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                style={{ padding: "4px" }}
                type="submit"
                className="btn btn-success"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Box;
