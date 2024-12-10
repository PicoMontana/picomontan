const axios = window.axios;

let carrito = [];
let favoritos = [];

axios.get('/productos')
  .then(response => {
    const productos = response.data;
    const productosContainer = document.getElementById('container');
    const carritoCount = document.getElementById('carrito-count');
    const favoritosCount = document.getElementById('favoritos-count');

    productosContainer.innerHTML = '';

    productos.forEach(producto => {
      const productoElement = document.createElement('div');
      productoElement.classList.add('producto');

      const rutaRelativaImagen = producto.image.replace("C:\\Users\\Gerard Hernandex\\Downloads\\picomontana\\", "");

      const precio = parseFloat(producto.precio);
      const precioFormateado = `$ ${precio.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;

      productoElement.innerHTML = `
        <img src="${rutaRelativaImagen}" alt="${producto.producto}">
        <h2>${producto.producto}</h2>
        <p>${producto.descripcion}</p>
        <p>Precio: ${precioFormateado}</p>
        <p>Cantidad: ${producto.qty}</p>
        <button onclick="comprarProducto('${producto._id}')">Comprar</button>
        <button onclick="agregarAlCarrito('${producto._id}', '${producto.producto}', ${precio})">Agregar al carrito</button>
        <button onclick="agregarAFavoritos('${producto._id}', '${producto.producto}')">Agregar a favoritos ❤️</button>
      `;

      productosContainer.appendChild(productoElement);
    });

    function actualizarContadores() {
      carritoCount.textContent = carrito.length;
      favoritosCount.textContent = favoritos.length;
    }

    window.comprarProducto = function (productId) {
      axios.post('/comprar', { productId })
        .then(() => alert('Compra realizada con éxito'))
        .catch(() => alert('Error al realizar la compra'));
    };

    window.agregarAlCarrito = function (id, name, price) {
      carrito.push({ id, name, price });
      actualizarContadores();
      alert(`${name} agregado al carrito`);
    };

    window.agregarAFavoritos = function (id, name) {
      if (!favoritos.some(fav => fav.id === id)) {
        favoritos.push({ id, name });
        actualizarContadores();
        alert(`${name} agregado a favoritos`);
      } else {
        alert(`${name} ya está en favoritos`);
      }
    };
  })
  .catch(error => console.error('Error al obtener los productos:', error));
