import app from "../../firebase";
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Spinner from "../Spinner";


const Private = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [ok, setOk] = useState(false);
  //   const { auth } = useAuthContext();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          sessionStorage.setItem("Token", idToken);
          //   console.log("Name " + user.displayName + " Email" + user.email);
          setOk(true);
        });
      } else {
        sessionStorage.removeItem("Token");
        setOk(false);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Private;