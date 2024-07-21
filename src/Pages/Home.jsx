import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [token, setToken] = useState(sessionStorage.getItem("Token") || '');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          sessionStorage.setItem("Token", idToken);
          setToken(idToken);
        });
      } else {
        sessionStorage.removeItem("Token");
        setToken('');
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = () => {
    signOut(auth);
    sessionStorage.clear();
    alert("Logout");
    navigate("/");
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Hello Vishal!</h1>
      <div style={{ margin: '20px auto', width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden' }}>
        <img
          src="https://via.placeholder.com/100" // Replace with actual profile picture URL
          alt="Profile"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card" style={{ padding: '20px', margin: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
              <div className="card-body">
                <h5 className="card-title">Card 1</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="input1" className="form-label">Input 1</label>
                    <input type="text" className="form-control" id="input1" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="radio1" className="form-label">Option 1</label>
                    <div>
                      <input type="radio" id="radio1" name="radio1" value="option1" />
                      <label htmlFor="radio1"> Option 1</label>
                    </div>
                    <div>
                      <input type="radio" id="radio2" name="radio1" value="option2" />
                      <label htmlFor="radio2"> Option 2</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ padding: '20px', margin: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
              <div className="card-body">
                <h5 className="card-title">Card 2</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="input2" className="form-label">Input 2</label>
                    <input type="text" className="form-control" id="input2" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="radio3" className="form-label">Option 2</label>
                    <div>
                      <input type="radio" id="radio3" name="radio2" value="option1" />
                      <label htmlFor="radio3"> Option 1</label>
                    </div>
                    <div>
                      <input type="radio" id="radio4" name="radio2" value="option2" />
                      <label htmlFor="radio4"> Option 2</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ padding: '20px', margin: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
              <div className="card-body">
                <h5 className="card-title">Card 3</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="input3" className="form-label">Input 3</label>
                    <input type="text" className="form-control" id="input3" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="radio5" className="form-label">Option 3</label>
                    <div>
                      <input type="radio" id="radio5" name="radio3" value="option1" />
                      <label htmlFor="radio5"> Option 1</label>
                    </div>
                    <div>
                      <input type="radio" id="radio6" name="radio3" value="option2" />
                      <label htmlFor="radio6"> Option 2</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className='btn.btn' style={{ textAlign: "center" }} onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default Home;
