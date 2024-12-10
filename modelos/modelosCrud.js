const mongoose = require('mongoose');

// Define el esquema del modelo Cliente
const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  }

  
  
});

// Define el modelo Cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

// Define el esquema del modelo Producto
const productoSchema = new mongoose.Schema({
  producto: {
    type: String,
    required: true
   
  },
  descripcion: {
   type: String,
   required: true
  },
  precio: {
        type: Number, 
        required: true
       
      },
   qty: {
    type: Number,
    required: true
  },
  
  image: {
    type: String, 
    required: true
  }


});

// Define el modelo Producto
const Producto = mongoose.model('Producto', productoSchema);

// Define el esquema del modelo Factura
const facturaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
      },
      cantidad: Number
    }
  ],
  fecha: {
    type: Date,
    default: Date.now
  }
});

// Define el modelo Factura
const Factura = mongoose.model('Factura', facturaSchema);
// exportamos los modelos
module.exports = { Cliente, Producto, Factura };
