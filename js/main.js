const productos = [
  { id: 1, nombre: "PlayStation 5", precio: 549990, img: "img/ps5.jpg" },
  { id: 2, nombre: "PC Gamer ASUS ROG", precio: 1299990, img: "img/pcrog.jpg" },
  { id: 3, nombre: "Silla Gamer Secretlab Titan", precio: 349990, img: "img/silla.jpg" }
];

// Carrito en localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");

  if (productList) {
    productos.forEach(p => {
      const precioFormateado = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP"
      }).format(p.precio);

      const card = document.createElement("div");
      card.classList.add("col-md-4");
      card.innerHTML = `
        <div class="card h-100 bg-black text-white border border-primary">
          <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text fw-bold">${precioFormateado}</p>
            <button class="btn btn-primary w-100 addToCart" data-id="${p.id}">
              Agregar al Carrito
            </button>
          </div>
        </div>
      `;
      productList.appendChild(card);
    });

    // Botones
    document.querySelectorAll(".addToCart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        agregarAlCarrito(id);
      });
    });
  }

  actualizarContador();
});

// Funciones carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  alert(`${producto.nombre} agregado al carrito ✅`);
}

function actualizarContador() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = carrito.length;
}
