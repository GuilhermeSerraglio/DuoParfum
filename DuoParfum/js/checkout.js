import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const resumo = document.getElementById("resumo-carrinho");
const totalSpan = document.getElementById("total");
const btnPagar = document.getElementById("btnPagar");
const msg = document.getElementById("mensagem");

let total = 0;

carrinho.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
  resumo.appendChild(li);
  total += item.preco;
});

totalSpan.textContent = total.toFixed(2);

btnPagar.addEventListener("click", async () => {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  if (!nome || !email) {
    msg.textContent = "Preencha todos os campos.";
    msg.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "pedidos"), {
      cliente: nome,
      email,
      itens: carrinho,
      total,
      data: Date.now(),
      criadoEm: serverTimestamp()
    });

    msg.textContent = "Pedido salvo! Redirecionando para pagamento...";
    msg.style.color = "green";

    // Criação do link de pagamento via backend ou sandbox
    // Aqui apenas simula redirecionamento
    setTimeout(() => {
      alert("Simulação: integração Mercado Pago futura");
      localStorage.removeItem("carrinho");
      window.location.href = "index.html";
    }, 2000);
  } catch (e) {
    msg.textContent = "Erro ao salvar pedido.";
    msg.style.color = "red";
    console.error(e);
  }
});
