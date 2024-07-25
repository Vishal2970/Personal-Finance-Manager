import React from "react";

export default function RegForm() {
  return (
    <>
      <div className="container" style={{position:"relative"}}>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Address" />
          </div>
          <div className="mb-3">
            <input
              type="phone"
              className="form-control"
              placeholder="Phone Number"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
