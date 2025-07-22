const listaCarrinho = document.getElementById("lista-carrinho");
const totalSpan = document.getElementById("total");
const finalizarBtn = document.getElementById("finalizar");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "item-carrinho";

    li.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" />
      <div>
        <h3>${item.nome}</h3>
        <p>R$ ${item.preco.toFixed(2)}</p>
        <button onclick="removerItem(${index})">Remover</button>
      </div>
    `;

    listaCarrinho.appendChild(li);
    total += item.preco;
  });

  totalSpan.textContent = total.toFixed(2);
}

function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

finalizarBtn.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  alert("Compra simulada! Integraremos com Firestore na próxima etapa.");
  carrinho = [];
  localStorage.removeItem("carrinho");
  atualizarCarrinho();
});

atualizarCarrinho();
