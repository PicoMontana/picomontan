// Hacer una solicitud al servidor para obtener los productos
axios.get('/productos')
  .then(response => {
    // Extraer los productos de la respuesta
    const productos = response.data;

    // Obtener el contenedor donde se mostrarán los productos
    const productosContainer = document.getElementById('container');

    // Limpiar el contenedor
    productosContainer.innerHTML = '';

    // Iterar sobre los productos y mostrarlos en la página
    productos.forEach(producto => {
      const productoElement = document.createElement('div');
      productoElement.classList.add('producto');
      
      // Construir el contenido del producto
      productoElement.innerHTML = `
        <h2>${producto.producto}</h2>
        <p>${producto.descripcion}</p>
        <img src="/uploads/${producto.image}"> <br />
        <p>Precio: ${producto.precio.toString()}</p>
        <p>Cantidad: ${producto.qty}</p>
        
      `;

      // Agregar el producto al contenedor
      productosContainer.appendChild(productoElement);
    });
  })
  .catch(error => {
    console.error('Error al obtener los productos:', error);
  });
