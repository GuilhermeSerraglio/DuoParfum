// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBt4KCTdAzJK2j6C_sH2eUllD3LOFiD6lI",
  authDomain: "duoparfum.firebaseapp.com",
  projectId: "duoparfum",
  storageBucket: "duoparfum.appspot.com",
  messagingSenderId: "859055985734",
  appId: "1:859055985734:web:b2601e4ee0c84cf6dd2e34"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
