import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB-76cHF_dqax3aXTiF0g7D3JEjZAqgnOw",
  authDomain: "personal-finance-manager-37b0e.firebaseapp.com",
  databaseURL: "https://personal-finance-manager-37b0e-default-rtdb.firebaseio.com",
  projectId: "personal-finance-manager-37b0e",
  storageBucket: "personal-finance-manager-37b0e.appspot.com",
  messagingSenderId: "842405940658",
  appId: "1:842405940658:web:5f76afebdf524e565368ab"
};
const app = initializeApp(firebaseConfig);
export default app;
