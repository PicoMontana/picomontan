// Hacer una solicitud al servidor para obtener los productos
const axios = window.axios;
axios.get('/productos')
  .then(response => {
    // Extraer los productos de la respuesta
    const productos = response.data;

    // Obtener el contenedor donde se mostrarán los productos
    const productosContainer = document.getElementById('container');
    const axios = window.axios;
    // Limpiar el contenedor
    productosContainer.innerHTML = '';

     // Añadir una clase al contenedor para aplicar estilos CSS
     productosContainer.classList.add('productos-row');

    // Iterar sobre los productos y mostrarlos en la página
    productos.forEach(producto => {
      const productoElement = document.createElement('div');
      productoElement.classList.add('producto');
       // Convertir el precio a un formato legible
       
      const precio = parseFloat(producto.precio.toString());

      // Convertir la ruta absoluta de la imagen a una ruta relativa
      const rutaRelativaImagen = producto.image.replace("C:\\Users\\Gerard Hernandex\\Downloads\\picomontana\\", "");
      
      // Crear elemento de imagen
      const imagenElement = document.createElement('img');
      imagenElement.src = rutaRelativaImagen;
      imagenElement.style.width = '200px'; // Establece el ancho deseado
      imagenElement.style.height = 'auto'; // Mantén la proporción

      // Agregar imagen al contenedor del producto
      productoElement.appendChild(imagenElement);

      // Construir el contenido del producto
      productoElement.innerHTML += `
        <h2>${producto.producto}</h2>
        <p>${producto.descripcion}</p>
        <p>Precio: ${producto.precio} ${producto.moneda}</p>
        <p>Cantidad: ${producto.qty}</p>
      `;

      // Agregar el producto al contenedor
      productosContainer.appendChild(productoElement);
    });
  })
  .catch(error => {
    console.error('Error al obtener los productos:', error);
  });
