const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;

// Quais operações são permitidas pela API nas req dos navegadores (diz respeito ao CORS)
roteador.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
});

// Listar fornecedores
roteador.get('/', async (req, res, proximo) => {
    const resultados = await TabelaFornecedor.listar();
    res.status(200);
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
    res.send(serializador.serializar(resultados));
});

module.exports = roteador