import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// for db
//import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import app from "../firebase";

const Register = () => {
  // for db
  //  const db = getDatabase(app);

  const auth = getAuth(app);

  const [register, setRegister] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = createUserWithEmailAndPassword(auth, register.email, register.password);
    // .then((value)=>console.log(value.user.getIdToken));

    // console.log(response);
    alert("Register successfull");
    navigate("/");
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegister({ ...register, [name]: value });
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
          <h5 className="card-title">Register</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={register.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={register.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="phone"
                className="form-control"
                name="phone"
                value={register.phone}
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
                value={register.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          <div style={{ marginTop: "10px" }}>
            <p> Already Registered ?</p>
            <Link to="/" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [login, setLogin] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Login successfull")
//     navigate("/home")
//   };

//   const handleChange = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
//     setLogin({ ...login, [name]: value });
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <div
//         className="card"
//         style={{
//           boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
//           transition: "0.3s",
//           width: "300px",
//           padding: "20px",
//         }}
//       >
//         <div className="card-body">
//           <h5 className="card-title">Login</h5>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 name="email"
//                 value={login.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={login.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">
//               Sign In
//             </button>
//           </form>
//           <div style={{ marginTop: "10px" }}>
//             <p>Not signed in?</p>
//             <Link to="/register" className="btn btn-secondary">
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
