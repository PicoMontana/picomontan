const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Importa el módulo path
const { Cliente, Producto, Factura } = require('../modelos/modelosCrud');

// Configura multer para la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre del archivo en el servidor
  }
});

const upload = multer({ storage });

// Crea el endpoint para crear un nuevo producto
router.post('/productos', upload.single('image'), async (req, res) => {
  try {
        // Parsear el precio como un número flotante
    const precio = parseFloat(req.body.precio.toString());

    // Verificar si el precio es un número válido
    if (isNaN(precio)) {
      return res.status(400).json({ success: false, message: 'El precio no es válido' });
    }

    const nuevoProducto = new Producto({
      producto: req.body.producto,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      qty: req.body.qty,
      image: req.file.path, // Ruta de la imagen subida
    });
    console.log(nuevoProducto.precio)
    await nuevoProducto.save();

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el producto',
    });
  }
});

// Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un producto por su ID
router.get('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un producto por su ID
router.put('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un producto por su ID
router.delete('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
