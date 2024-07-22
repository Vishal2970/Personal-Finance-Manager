import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [context, setContext] = useState({
    user: null,
    token: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          sessionStorage.setItem("Token", idToken);
          setContext({ user, token: idToken });
        });
      } else {
        sessionStorage.removeItem("Token");
        setContext({ user: null, token: null });
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <AuthContext.Provider value={{ context, setContext }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };
