// Arquivo principal do projeto
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const req = require('express/lib/request');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const roteador = require('./rotas/fornecedores');
const formatosAceitos = require('./Serializador').formatosAceitos;
const SerializadorErro = require('./Serializador').SerializadorErro;
const cors = require('cors');

app.use(bodyParser.json());


app.use((req, res, proximo) => {
    res.set('X-Powered-By', 'Gatito Petshop');
    proximo();
})

app.use((req, res, proximo) => {
    let formatoRequisitado = req.header('Accept');

    if (formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json';
    }

    if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
        res.status(406);
        res.end();
        return;
    }

    res.setHeader('Content-Type', formatoRequisitado);
    proximo();
})

// app.use(cors());

app.use((req, res, proximo) => {
    res.header('Access-Control-Allow-Origin', 'https://developer.mozilla.org/pt-BR/');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    proximo();
})

app.use('/api/fornecedores', roteador);

app.use((erro, req, res, proximo) => {
    let status = 500;

    if(erro instanceof NaoEncontrado) {
        status = 404;
    } 
    
    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400;
    }

    if (erro instanceof ValorNaoSuportado) {
        status = 406;
    }

    res.status(status);
    const serializador = new SerializadorErro(
        res.getHeader('Content-Type'),
    )

    res.send(serializador.serializar({id: erro.idErro, mensagem: erro.message}))
})

app.listen(config.get('api.porta'), () => {
    console.log('A API está funcionando!');
});