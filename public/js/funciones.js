// Objeto con cantidades: { "FU-00001": 2, "FU-00002": 1 }
let pedido = JSON.parse(localStorage.getItem("pedidoPixel")) || {};

function guardarYActualizar() {
  localStorage.setItem("pedidoPixel", JSON.stringify(pedido));

  const lista = Object.entries(pedido)
    .map(([codigo, cantidad]) => `${codigo} x${cantidad}`)
    .join(", ");

  const textarea = document.getElementById("listaPedido");
  if (textarea) textarea.value = lista;

  const total = Object.values(pedido).reduce((a, b) => a + b, 0);
  const carritoBtn = document.getElementById("carritoBtn");
  if (carritoBtn) carritoBtn.innerText = `🛍️ Pedido (${total})`;
}

function agregarAlPedido(codigo) {
  if (pedido[codigo]) {
    pedido[codigo]++;
  } else {
    pedido[codigo] = 1;
  }
  guardarYActualizar();
}

function copiarPedido() {
  const textarea = document.getElementById("listaPedido");
  if (!textarea) return;
  textarea.select();
  document.execCommand("copy");
  alert("¡Códigos copiados!");
}

function borrarPedido() {
  pedido = {};
  guardarYActualizar();
  togglePedido(false);
}

function togglePedido(forceClose = null) {
  const panel = document.getElementById("panelPedido");
  if (!panel) return;
  if (forceClose !== null) {
    panel.style.display = forceClose ? "block" : "none";
  } else {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  }
}

window.addEventListener("DOMContentLoaded", guardarYActualizar);