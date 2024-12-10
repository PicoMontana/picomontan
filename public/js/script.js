document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1, nombre: 'Baston de trekking, 135 en aluminio', precio: 50.000, imagen: '/img/pro1.jpg', categoria: 'senderismo' },
        { id: 2, nombre: 'Liquido para agarre en escala', precio: 20.000, imagen: '/img/pro2.png', categoria: 'escalar' },
        { id: 3, nombre: 'Linterna Frontal H20vg', precio: 40.000, imagen: '/img/pro3.jpg', categoria: 'escalar' },
        { id: 4, nombre: 'Polainas cortas Ankle Gaiter', precio: 30.000, imagen: '/img/pro4.jpg', categoria: 'senderismo' },
        { id: 5, nombre: 'Mochila de caminata 60+ 5 litros', precio: 70.000, imagen: '/img/pro5.jpg', categoria: 'escalar' },
        { id: 6, nombre: 'Cuerda paracord 30MT 3mm Basic', precio: 55.000, imagen: '/img/pro6.jpeg', categoria: 'escalar' },
        { id: 7, nombre: 'Vejiga de hidratación 3 litros Basic', precio: 20.000, imagen: '/img/pro7.jpg', categoria: 'senderismo' },
        { id: 8, nombre: 'bufanda Multifuncional Unisex, basic', precio: 45.000, imagen: '/img/pro8.jpg', categoria: 'senderismo' },
        { id: 9, nombre: 'Navaja camuflada, Boker, Unisex', precio: 25.000, imagen: '/img/pro9.jpg', categoria: 'secalar' },
        { id: 10, nombre: 'Botas para senderismo', precio: 50.000, imagen: '/img/pro10.jpg', categoria: 'Electrónica' }
    ];

    const catalogo = document.getElementById('catalogo-productos');
    const carritoIcono = document.getElementById('carrito');
    const favoritosIcono = document.getElementById('favoritos');
    const modalCarrito = document.getElementById('modal-carrito');
    const modalCompra = document.getElementById('modal-compra');
    const modalFavoritos = document.getElementById('modal-favoritos');
    const listaCarrito = document.getElementById('lista-carrito');
    const listaFavoritos = document.getElementById('lista-favoritos');
    const totalCarrito = document.getElementById('total-carrito');
    const botonComprar = document.getElementById('comprar');
    const contadorCarrito = document.getElementById('contador-carrito');
    const formularioCompra = document.getElementById('formulario-compra');
    const notificaciones = document.getElementById('notificaciones');

    let carrito = [];
    let favoritos = [];

    // Funciones de almacenamiento
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            actualizarCarrito();
        }
    }

    function guardarFavoritos() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    function cargarFavoritos() {
        const favoritosGuardados = localStorage.getItem('favoritos');
        if (favoritosGuardados) {
            favoritos = JSON.parse(favoritosGuardados);
            actualizarFavoritos();
        }
    }

    // Funciones de renderizado
    function renderizarProductos() {
        catalogo.innerHTML = '';
        productos.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <div class="acciones-producto">
                    <button onclick="agregarAlCarrito(${producto.id})">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                    <button onclick="agregarAFavoritos(${producto.id})">
                        <i class="fas fa-heart"></i> Favoritos
                    </button>
                </div>
            `;
            catalogo.appendChild(div);
        });
    }

    // Funciones de Carrito
    window.agregarAlCarrito = (id) => {
        const producto = productos.find(p => p.id === id);
        if (!producto) return; // Validación adicional

        const productoExistente = carrito.find(p => p.id === id);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({...producto, cantidad: 1});
        }

        mostrarNotificacion(`${producto.nombre} agregado al carrito`);
        actualizarCarrito();
        guardarCarrito();
    }

    function actualizarCarrito() {
        if (!listaCarrito) return; // Validación de elemento

        listaCarrito.innerHTML = '';
        let total = 0;

        carrito.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('item-carrito');
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h4>${producto.nombre}</h4>
                    <p>Cantidad: 
                        <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                        ${producto.cantidad}
                        <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                    </p>
                    <p>Precio: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
                    <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                </div>
            `;
            listaCarrito.appendChild(div);
            total += producto.precio * producto.cantidad;
        });

        // Validaciones adicionales
        if (totalCarrito) {
            totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
        }
        
        if (contadorCarrito) {
            contadorCarrito.textContent = carrito.reduce((total, p) => total + p.cantidad, 0);
        }
    }

    window.cambiarCantidad = (id, cambio) => {
        const producto = carrito.find(p => p.id === id);
        if (producto) {
            producto.cantidad = Math.max(1, producto.cantidad + cambio);
            if (producto.cantidad === 0) {
                carrito = carrito.filter(p => p.id !== id);
            }
            actualizarCarrito();
            guardarCarrito();
        }
    }

    window.eliminarDelCarrito = (id) => {
        carrito = carrito.filter(producto => producto.id !== id);
        actualizarCarrito();
        guardarCarrito();
        mostrarNotificacion('Producto eliminado del carrito');
    }

    // Funciones de Favoritos
    window.agregarAFavoritos = (id) => {
        const producto = productos.find(p => p.id === id);
        if (!producto) return; // Validación adicional

        if (!favoritos.some(f => f.id === id)) {
            favoritos.push(producto);
            mostrarNotificacion(`${producto.nombre} agregado a favoritos`);
            actualizarFavoritos();
            guardarFavoritos();
        } else {
            mostrarNotificacion(`${producto.nombre} ya está en favoritos`);
        }
    }

    function actualizarFavoritos() {
        if (!listaFavoritos) return; // Validación de elemento

        listaFavoritos.innerHTML = '';
        favoritos.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('item-favorito');
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h4>${producto.nombre}</h4>
                    <p>$${producto.precio}</p>
                    <button onclick="eliminarDeFavoritos(${producto.id})">Eliminar</button>
                </div>
            `;
            listaFavoritos.appendChild(div);
        });
    }

    window.eliminarDeFavoritos = (id) => {
        favoritos = favoritos.filter(producto => producto.id !== id);
        actualizarFavoritos();
        guardarFavoritos();
        mostrarNotificacion('Producto eliminado de favoritos');
    }

    // Funciones de Compra
    formularioCompra.addEventListener('submit', (e) => {
        e.preventDefault();
        if (carrito.length === 0) {
            mostrarNotificacion('El carrito está vacío');
            return;
        }
        mostrarNotificacion('Compra procesada exitosamente');
        carrito = [];
        actualizarCarrito();
        guardarCarrito();
        localStorage.removeItem('carrito');
        modalCompra.style.display = 'none';
    });

    // Funciones de Notificación
    function mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.classList.add('notificacion');
        notificacion.textContent = mensaje;
        notificaciones.appendChild(notificacion);

        setTimeout(() => {
            notificacion.remove();
        }, 3000);
    }

    // Eventos de Modales
    document.querySelectorAll('.cerrar').forEach(boton => {
        boton.addEventListener('click', () => {
            boton.closest('.modal').style.display = 'none';
        });
    });

    carritoIcono.addEventListener('click', () => {
        modalCarrito.style.display = 'block';
    });

    favoritosIcono.addEventListener('click', () => {
        modalFavoritos.style.display = 'block';
        actualizarFavoritos();
    });

    botonComprar.addEventListener('click', () => {
        if (carrito.length === 0) {
            mostrarNotificacion('El carrito está vacío');
            return;
        }
        modalCompra.style.display = 'block';
    });

    // Inicialización
    renderizarProductos();
    cargarCarrito();
    cargarFavoritos();
});