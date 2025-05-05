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

  <!-- Modal de imagen -->
  <div class="modal" id="imageModal">
    <div class="modal-content">
      <span class="close-modal" onclick="cerrarModal()">×</span>
      <img alt="Imagen Ampliada" id="modalImg" src="" />
    </div>
  </div>
  <div id="imgModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; 
            background-color:rgba(0,0,0,0.8); z-index:2000; justify-content:center; align-items:center;">
    <div style="position:relative; max-width:90%; max-height:90%;">
      <img alt="Sticker ampliado" id="modalImg" src=""
        style="max-width:100%; max-height:100%; border-radius:10px; background:white;" />
      <button onclick="cerrarImagen()"
        style="position:absolute; top:-10px; right:-10px; background:#ff914d; color:white; border:none; border-radius:50%; padding:10px; cursor:pointer;">X</button>
    </div>
  </div>
  <script>
    function mostrarImagen(src) {
      var modal = document.getElementById('imgModal');
      var modalImg = document.getElementById('modalImg');
      modal.style.display = 'flex';
      modalImg.src = src;
    }
    function cerrarImagen() {
      document.getElementById('imgModal').style.display = 'none';
    }
  </script>
  <div id="modalSticker"
    style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color: rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center;">
    <div
      style="background-color: white; padding: 20px; border-radius: 10px; max-width: 90%; max-height: 90%; text-align: center; position: relative;">
      <span onclick="cerrarModal()"
        style="position:absolute; top:10px; right:15px; cursor:pointer; font-size:24px; font-weight:bold;">×</span>
      <img alt="Sticker ampliado" id="imagenModal" src="" style="max-width:100%; max-height:80vh;" />
    </div>
  </div>
  <script>
    function ampliarSticker(src) {
      document.getElementById("imagenModal").src = src;
      document.getElementById("modalSticker").style.display = "flex";
    }
    function cerrarModal() {
      document.getElementById("modalSticker").style.display = "none";
    }

