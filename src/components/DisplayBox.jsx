import React from "react";

function DisplayBox({ cardName, entries }) {
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
