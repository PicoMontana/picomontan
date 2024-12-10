const express = require('express');
const router = express.Router();
const axios = require('axios');


// ruta inicio

router.get('/', (req, res) => {
    res.render('Home');
});

// rutas adiministrador

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/clientes', (req, res) => {
    res.render('clientes');
});

router.get('/productos/productos', (req, res) => {
    res.render('productos/productos');
});

router.get('/index4', (req, res) => {
    res.render('index4');
});
// tutas entradas

router.get('/login', (req, res) => {
    res.render('rutas/login');
});

router.get('/Hotel', (req, res) =>{ 
    res.render('rutas/Hotel');
});

router.get('/Agent', (req, res) =>{
    res.render('rutas/Agent');
});

router.get('/restaurante', (req, res) => {
    res.render('rutas/restaurante');
});

router.get('/Contac', (req, res) =>{
    res.render('rutas/Contac');
});

router.get('/privacidad', (req, res) =>{
    res.render('rutas/privacidad');
});

router.get('/quienesomos', (req, res) => {
    res.render('rutas/quienesomos');
})

// rutas usuario


router.get('/usuario/user', (req, res) => {
    res.render('usuario/user');
})

router.get('/usuario/profile', (req, res) => {
    const nombredeusuario = 'NombreDeUsuario'; 
    res.render('usuario/profile',);
})

router.get('/perfiles', (req, res) => {
    res.render('rutas/perfiles');
});


// rutas nuevas de redireccionaiento 
router.get('/produc1', (req, res) => {
    res.render('rutas/produc1');
});
router.get('/prom', (req, res) => {
    res.render('rutas/prom');
});

router.get('/index1', (req, res) => {
    res.render('rutas/index1');
});

router.get('/index2', (req, res) => {
    res.render('rutas/index2');
});

router.get('/index3', (req, res) => {
    res.render('rutas/index3');
});


module.exports = router;