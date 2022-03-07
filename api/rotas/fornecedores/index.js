const roteador = require('express').Router();

roteador.use('/', (req, res) => {
    res.send('Ok');
});

module.exports = roteador;