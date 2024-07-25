import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Private from "./Pages/privateMaker/Private";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/home" element={<Private />}>
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;


/* <Route path="/profile" element={<PrivateRoute />}>
  <Route path="" element={<Profile title="Profile" />} />
</Route>; */
