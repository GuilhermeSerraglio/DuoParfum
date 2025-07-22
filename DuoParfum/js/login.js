import { auth, provider } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const btnEntrar = document.getElementById("btnEntrar");
const btnCadastrar = document.getElementById("btnCadastrar");
const btnGoogle = document.getElementById("btnGoogle");
const mensagem = document.getElementById("mensagem");

// Login com email/senha
btnEntrar.addEventListener("click", () => {
  const email = emailInput.value;
  const senha = senhaInput.value;

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      mensagem.textContent = "Erro ao entrar: " + error.message;
    });
});

// Criar conta
btnCadastrar.addEventListener("click", () => {
  const email = emailInput.value;
  const senha = senhaInput.value;

  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      mensagem.textContent = "Erro ao criar conta: " + error.message;
    });
});

// Login com Google
btnGoogle.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      mensagem.textContent = "Erro no Google Login: " + error.message;
    });
});
