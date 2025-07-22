import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const admins = ["guilherme.piccini@hotmail.com", "duoparfum@hotmail.com"];
const lista = document.getElementById("lista-pedidos");

onAuthStateChanged(auth, async (user) => {
  if (!user || !admins.includes(user.email)) {
    alert("Acesso negado. Apenas administradores.");
    window.location.href = "index.html";
  } else {
    await carregarPedidos();
  }
});

async function carregarPedidos() {
  const querySnapshot = await getDocs(collection(db, "pedidos"));

  if (querySnapshot.empty) {
    lista.innerHTML = "<p>Nenhum pedido encontrado.</p>";
    return;
  }

  querySnapshot.forEach((docItem) => {
    const pedido = docItem.data();

    const div = document.createElement("div");
    div.className = "card";

    const dataFormatada = new Date(pedido.data).toLocaleString("pt-BR");

    div.innerHTML = `
      <h3>Cliente: ${pedido.cliente}</h3>
      <p>Email: ${pedido.email}</p>
      <p>Data: ${dataFormatada}</p>
      <ul>
        ${pedido.itens.map(item => `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`).join("")}
      </ul>
      <strong>Total: R$ ${pedido.total.toFixed(2)}</strong>
    `;

    lista.appendChild(div);
  });
}
