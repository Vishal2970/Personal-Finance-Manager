import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebase";

const Login = () => {
  const auth = getAuth(app);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
      // const data = response.user;
      // console.log(data);
      // sessionStorage.setItem("Token", data.accessToken);
      // alert("Login successfull");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // console.log(response);
      // // alert("Login with google");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLogin({ ...login, [name]: value });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="card"
        style={{
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          transition: "0.3s",
          width: "300px",
          padding: "20px",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={login.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={login.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
            <button
              style={{ margin: "10px" }}
              onClick={handleGoogleLogin}
              className="btn btn-success"
            >
              Google
            </button>
          </form>
          <div style={{ marginTop: "10px" }}>
            <p>Not signed in?</p>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
