import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const admins = ["guilherme.piccini@hotmail.com", "duoparfum@hotmail.com"];
const form = document.getElementById("form-cadastro");
const msg = document.getElementById("mensagem");
const lista = document.getElementById("lista-produtos");

let usuarioAtual = null;

onAuthStateChanged(auth, async (user) => {
  if (!user || !admins.includes(user.email)) {
    alert("Acesso restrito. Somente administradores autorizados.");
    window.location.href = "index.html";
  } else {
    usuarioAtual = user;
    await carregarProdutos();
  }
});

// Cadastrar novo perfume
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const imagem = document.getElementById("imagem").value;
  const descricao = document.getElementById("descricao").value;

  try {
    await addDoc(collection(db, "produtos"), {
      nome,
      preco,
      imagem,
      descricao
    });

    msg.textContent = "Produto cadastrado com sucesso!";
    form.reset();
    await carregarProdutos();
  } catch (error) {
    msg.textContent = "Erro ao cadastrar: " + error.message;
    msg.style.color = "red";
  }
});

// Carregar produtos para listar e excluir
async function carregarProdutos() {
  lista.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "produtos"));

  querySnapshot.forEach((docItem) => {
    const produto = docItem.data();
    const id = docItem.id;

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <strong>R$ ${produto.preco.toFixed(2)}</strong>
      <button onclick="excluirProduto('${id}')">Excluir</button>
    `;
    lista.appendChild(div);
  });
}

// Excluir produto
window.excluirProduto = async function (id) {
  const confirmacao = confirm("Deseja realmente excluir este produto?");
  if (!confirmacao) return;

  try {
    await deleteDoc(doc(db, "produtos", id));
    await carregarProdutos();
    alert("Produto excluído com sucesso.");
  } catch (error) {
    alert("Erro ao excluir produto: " + error.message);
  }
};
