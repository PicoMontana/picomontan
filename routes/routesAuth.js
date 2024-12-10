const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/modeloAuth');
const isAuthenticated = require('../middleware/isAuthenticated');

// Ruta protegida
router.get('/profile', isAuthenticated, (req, res) => {
  // Esta ruta solo será accesible si el usuario está autenticado
  res.send('Perfil de usuario');
});

module.exports = router;


// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secreto');
    req.userId = decodedToken.usuarioId;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Registro de usuario
router.post('/registro', async (req, res) => {
  try {
    const { namer, usernamer, passwordr, profile } = req.body;

    if (!namer || !usernamer || !passwordr || !profile) {
      return res.status(400).json({ error: 'Por favor, proporciona todos los campos requeridos.' });
    }

    const existingUser = await Usuario.findOne({ username: usernamer });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
    }

    const hashedPassword = await bcrypt.hash(passwordr, 12);

    const newUser = new Usuario({
      name: namer,
      username: usernamer,
      password: hashedPassword,
      profile: profile
    });

    await newUser.save();
    console.log('Registrado con éxito');
    res.status(201).json({ mensaje: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario.' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Usuario.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    const passwordValido = await bcrypt.compare(password, user.password);

    if (!passwordValido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
      
    const token = jwt.sign({ usuarioId: user._id }, 'secreto', { expiresIn: '1h' });

    res.json({
      token: token,
      profile: user.profile,
      mensaje: 'Inicio de sesión exitoso',
    });

    
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminación de usuario
router.delete('/eliminar/:id', authMiddleware, async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    await Usuario.findByIdAndDelete(usuarioId);

    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


// Cerrar sesión
router.post('/logout', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    jwt.verify(token, 'secreto');
    res.json({ mensaje: 'Cierre de sesión exitoso' });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
});

// Obtener información del perfil del usuario autenticado
router.get('/perfil', authMiddleware, async (req, res) => {
  try {
    const user = await Usuario.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
  }
});

// Actualizar información del perfil del usuario autenticado
router.put('/perfil', authMiddleware, async (req, res) => {
  const { name, username, profile, password } = req.body;
  try {
    const updates = { name, username, profile };

    if (password) {
      updates.password = await bcrypt.hash(password, 12);
    }

    const user = await Usuario.findByIdAndUpdate(req.userId, updates, { new: true, omitUndefined: true });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Perfil actualizado correctamente', user });
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil del usuario' });
  }
});

module.exports = router;


