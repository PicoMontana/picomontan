// Importación de módulos
const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const rutasViews = require('./routes/routesViews');
const auth = require('./routes/routesAuth'); // Importa las rutas de autenticación desde el archivo auth.js
const crud = require('./routes/routesCrud');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const compression = require('compression');

require('dotenv').config();
// Creación de una aplicación Express
const app = express();
app.use(cors())


app.use(compression());
// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configurar la carpeta 'views' para las vistas EJS
app.set('views', path.join(__dirname, 'views'));

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');

// Puerto en el que el servidor escuchará las solicitudes
const port = 3000;

// Middleware para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Habilita CORS para permitir solicitudes desde otros dominios
//app.use(cors());

// Configuración para manejar solicitudes JSON
app.use(express.json());

// Uso de las rutas desde rutasViews.js
app.use('/', rutasViews);

// codigo nuevo

app.post('/comprar', (req, res) => {
    const { productId } = req.body;
    // Lógica para procesar la compra
    res.json({ message: 'Compra exitosa', productId });
  });
  

// Nuevo código para procesar el formulario
app.use(bodyParser.json());

// Ruta para manejar el envío del formulario de reservas
app.post('/send-reservation', async (req, res) => {
    const {
        name, 
        document, 
        address, 
        phone, 
        email,
        checkin, 
        checkout, 
        roomType, 
        beds, 
        view, 
        specialNeeds,
        adults, 
        breakfast, 
        parking, 
        massage, 
        transfers,
        paymentMethod, 
        cardType, 
        cardNumber, 
        expirationDate, 
        cvv,
        observations
    } = req.body;

    // Crear cuenta de prueba con Ethereal
    let testAccount = await nodemailer.createTestAccount();

    // Configurar el transporte de correo
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: testAccount.user, // Usuario generado por Ethereal
            pass: testAccount.pass  // Contraseña generada por Ethereal
        }
    });

    // Opciones del correo
    let mailOptions = {from: `"Reservaciones" <${email}>`,
    to: 'hotelf25@example.com', // Cambia esto por la dirección de correo del hotel
    subject: 'Nueva Reservación',
    text: `
      Nombre completo: ${name}
      Dirección: ${address}
      Teléfono: ${phone}
      Correo electrónico: ${email}
      Fecha de llegada: ${checkin}
      Fecha de salida: ${checkout}
      Tipo de habitación: ${roomType}
      Número de camas: ${beds}
      Vista: ${view}
      Necesidades especiales: ${specialNeeds}
      Número de adultos: ${adults}
      Servicios adicionales: 
        Desayuno incluido: ${breakfast ? 'Sí' : 'No'}
        Estacionamiento: ${parking ? 'Sí' : 'No'}
        Masajes: ${massage ? 'Sí' : 'No'}
        Traslados al aeropuerto: ${transfers ? 'Sí' : 'No'}
      Forma de pago: ${paymentMethod}
      Observaciones: ${observations}
    `,
    html: `
      <b>Nombre completo:</b> ${name}<br>
      <b>Dirección:</b> ${address}<br>
      <b>Teléfono:</b> ${phone}<br>
      <b>Correo electrónico:</b> ${email}<br>
      <b>Fecha de llegada:</b> ${checkin}<br>
      <b>Fecha de salida:</b> ${checkout}<br>
      <b>Tipo de habitación:</b> ${roomType}<br>
      <b>Número de camas:</b> ${beds}<br>
      <b>Vista:</b> ${view}<br>
      <b>Necesidades especiales:</b> ${specialNeeds}<br>
      <b>Número de adultos:</b> ${adults}<br>
      <b>Servicios adicionales:</b><br>
      - Desayuno incluido: ${breakfast ? 'Sí' : 'No'}<br>
      - Estacionamiento: ${parking ? 'Sí' : 'No'}<br>
      - Masajes: ${massage ? 'Sí' : 'No'}<br>
      - Traslados al aeropuerto: ${transfers ? 'Sí' : 'No'}<br>
      <b>Forma de pago:</b> ${paymentMethod}<br>
      <b>Observaciones:</b> ${observations}
    `
};

    try {
        // Enviar el correo
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.status(200).send('Correo enviado');
    } catch (error) {
        console.error('Error enviando el correo:', error);
        res.status(500).send('Error enviando el correo');
    }
});


//Define las rutas en tu aplicación, en este caso, la ruta de autenticación '/api'
  app.use('/api', auth);

// rutas de los end-points
// Define las rutas en tu aplicación
app.use('/', crud);

// Conexión a MongoDB
mongoose.connect('mongodb+srv://montanaP:2024Nicol@pico.hbp8b2o.mongodb.net/?retryWrites=true&w=majority&appName=Pico');
const db = mongoose.connection;

// Manejo de eventos de conexión y error a MongoDB
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
/*
El código que se proporciona es un servidor web básico utilizando Node.js y 
Express, con integración de MongoDB mediante Mongoose. Además, 
incluye configuraciones para manejar vistas con EJS, CORS para 
permitir solicitudes desde otros dominios, 
y una ruta de autenticación definida en el archivo auth.js. 

*/