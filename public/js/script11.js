const carritoList = document.getElementById('carrito-list');
const favoritosList = document.getElementById('favoritos-list');
const modalCarrito = document.getElementById('modal-carrito');
const modalFavoritos = document.getElementById('modal-favoritos');
const modalCompra = document.getElementById('modal-compra');
const closeCarrito = document.getElementById('close-carrito');
const closeFavoritos = document.getElementById('close-favoritos');
const closeCompra = document.getElementById('close-compra');
const comprarDesdeCarrito = document.getElementById('comprar-desde-carrito');

// Mostrar el carrito
document.getElementById('carrito').addEventListener('click', () => {
  carritoList.innerHTML = '';
  carrito.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    carritoList.appendChild(li);
  });
  modalCarrito.style.display = 'flex';
});

// Mostrar favoritos
document.getElementById('favoritos').addEventListener('click', () => {
  favoritosList.innerHTML = '';
  favoritos.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.name;
    favoritosList.appendChild(li);
  });
  modalFavoritos.style.display = 'flex';
});

// Cerrar modales
closeCarrito.addEventListener('click', () => (modalCarrito.style.display = 'none'));
closeFavoritos.addEventListener('click', () => (modalFavoritos.style.display = 'none'));
closeCompra.addEventListener('click', () => (modalCompra.style.display = 'none'));

// Mostrar formulario desde carrito
comprarDesdeCarrito.addEventListener('click', () => {
  modalCarrito.style.display = 'none';
  modalCompra.style.display = 'flex';
});

// Abrir formulario desde botón Comprar
window.comprarProducto = function (productId) {
  modalCompra.style.display = 'flex';
};

// Manejar formulario de compra
document.getElementById('form-compra').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  console.log('Compra realizada:', data);
  modalCompra.style.display = 'none';
  alert('Compra realizada con éxito');
});
