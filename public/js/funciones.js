let pedido = JSON.parse(localStorage.getItem("pedidoPixel")) || {};

function guardarYActualizar() {
  localStorage.setItem("pedidoPixel", JSON.stringify(pedido));
  const lista = Object.entries(pedido)
    .map(([codigo, cantidad]) => `${codigo} x${cantidad}`)
    .join(", ");
  const textarea = document.getElementById("listaPedido");
  const boton = document.getElementById("carritoBtn");
  if (textarea && boton) {
    textarea.value = lista;
    const total = Object.values(pedido).reduce((a, b) => a + b, 0);
    boton.innerText = `🛍️ Pedido (${total})`;
  }
}

function agregarAlPedido(codigo) {
  pedido[codigo] = (pedido[codigo] || 0) + 1;
  guardarYActualizar();
}

function copiarPedido() {
  const textarea = document.getElementById("listaPedido");
  if (textarea) {
    textarea.select();
    document.execCommand("copy");
    alert("¡Códigos copiados!");
  }
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

window.onload = guardarYActualizar;

function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

window.addEventListener("click", function (e) {
  const menu = document.getElementById("dropdownMenu");
  if (!e.target.matches('.dropbtn') && menu) {
    menu.style.display = "none";
  }
});

// Modal imagen
function ampliarSticker(src) {
  let modal = document.getElementById("modalSticker");
  let imagen = document.getElementById("imagenModal");
  if (modal && imagen) {
    imagen.src = src;
    modal.style.display = "flex";
  }
}
function cerrarModal() {
  let modal = document.getElementById("modalSticker");
  if (modal) modal.style.display = "none";
}