import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB-76cHF_dqax3aXTiF0g7D3JEjZAqgnOw",
  authDomain: "personal-finance-manager-37b0e.firebaseapp.com",
  projectId: "personal-finance-manager-37b0e",
  storageBucket: "personal-finance-manager-37b0e.appspot.com",
  messagingSenderId: "842405940658",
  appId: "1:842405940658:web:e2257a5a63ea4a815368ab",
  databaseURL:
    "https://personal-finance-manager-37b0e-default-rtdb.firebaseio.com/",
};
const app = initializeApp(firebaseConfig);
export default app;
