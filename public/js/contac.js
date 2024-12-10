// Importar dependencias
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Configuración del transporte de correo usando variables de entorno
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Email del remitente
        pass: process.env.EMAIL_PASS  // Contraseña del remitente
    }
});

// Ruta POST para enviar correo
app.post('/enviar-correo', async (req, res) => {
    const { nombre, correo, mensaje, token } = req.body;

    // Validar token (mejora necesaria: implementar un sistema dinámico de tokens)
    if (token !== process.env.VALID_TOKEN) {
        return res.status(400).json({ error: 'Token no válido.' });
    }

    // Validar campos requeridos
    if (!nombre || !correo || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: 'El correo electrónico no es válido.' });
    }

    // Opciones del correo
    const mailOptions = {
        from: `${nombre} <${correo}>`,
        to: process.env.RECEIVER_EMAIL, // Email receptor
        subject: 'Nuevo mensaje de contacto',
        text: `Nombre: ${nombre}\nCorreo electrónico: ${correo}\nMensaje: ${mensaje}`
    };

    try {
        // Enviar correo electrónico
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        res.status(200).json({ message: 'Correo enviado exitosamente.' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error interno al enviar el correo.' });
    }
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch('/enviar-correo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            responseMessage.textContent = 'Mensaje enviado correctamente. ¡Gracias por contactarnos!';
            responseMessage.className = 'response-message success';
            e.target.reset();
        } else {
            responseMessage.textContent = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.';
            responseMessage.className = 'response-message error';
        }
    } catch (error) {
        console.error(error);
        responseMessage.textContent = 'Error interno. Por favor, inténtalo más tarde.';
        responseMessage.className = 'response-message error';
    }
});
