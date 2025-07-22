// Importações necessárias do Firebase modular
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Configurações do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC9x1yRCeTIlx9vJyZQxa6_4tK6Oc1eNXg",
  authDomain: "duoparfum-a0108.firebaseapp.com",
  projectId: "duoparfum-a0108",
  storageBucket: "duoparfum-a0108.firebasestorage.app",
  messagingSenderId: "747127124075",
  appId: "1:747127124075:web:443a01002c8698e057412e",
  measurementId: "G-QKV7PG5DRD"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Exporta para outros arquivos JS
export { db, auth, provider };
