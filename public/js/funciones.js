    // Guardamos un objeto con cantidad por código
    let pedido = JSON.parse(localStorage.getItem("pedidoPixel")) || {};
  
    function guardarYActualizar() {
      localStorage.setItem("pedidoPixel", JSON.stringify(pedido));
  
      // Convertimos a texto amigable: FU-00001 x2, FU-00003 x1
      const lista = Object.entries(pedido)
        .map(([codigo, cantidad]) => `${codigo} x${cantidad}`)
        .join(", ");
  
      document.getElementById("listaPedido").value = lista;
      const total = Object.values(pedido).reduce((a, b) => a + b, 0);
      document.getElementById("carritoBtn").innerText = `🛍️ Pedido (${total})`;
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
  
    // Cierra el menú si se hace clic fuera
    window.addEventListener("click", function (e) {
      const menu = document.getElementById("dropdownMenu");
      if (!e.target.matches('.dropbtn')) {
        if (menu.style.display === "block") {
          menu.style.display = "none";
        }
      }
    });
    
    function ampliarSticker(src) {
        document.getElementById("imagenModal").src = src;
        document.getElementById("modalSticker").style.display = "flex";
      }
      
      function cerrarModal() {
        document.getElementById("modalSticker").style.display = "none";
      }

