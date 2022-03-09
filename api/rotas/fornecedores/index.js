// Rotas

const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const NaoEncontrado = require('../../erros/NaoEncontrado');

// Listar fornecedores
roteador.get('/', async (req, res, proximo) => {
    const resultados = await TabelaFornecedor.listar();
    res.status(200);
    res.send(JSON.stringify(resultados));
});

// Cadastrar fornecedor
roteador.post('/', async (req, res, proximo) => {
    try {
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
        res.status(201);
        res.send(JSON.stringify(fornecedor))
    } catch (erro) {
        proximo(erro);
    }
})

// Detalhes de um fornecedor
roteador.get('/:idFornecedor', async (req, res, proximo) =>{
    try{
        // Recebendo o id por parâmtro do user
        const id = req.params.idFornecedor;

        // Encontrando o fornecedor desejado pelo id
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.carregar();

        // Respondendo ao usuário o fornecedor encontrado
        res.send(JSON.stringify(fornecedor));
    }catch(erro) {
        proximo(erro);
    }
})

// Atualizando um fornecedor
roteador.put('/:idFornecedor', async (req, res, proximo) => {
    try {
        // Recebendo o id por parâmetro do user
        const id = req.params.idFornecedor;

        // Recebendo os dados a serem atualizados do fornecedor desejado
        const dadosRecebidos = req.body;

        // Unindo as variáveis
        const dados = Object.assign({}, dadosRecebidos, {id: id});

        // Encontrando o fornecedor desejado
        const fornecedor = new Fornecedor(dados);

        await fornecedor.atualizar();
        res.status(204);
        res.end();

    } catch (erro) {
        proximo(erro);
    }
})

// Removendo um fornecedor
roteador.delete('/:idFornecedor', async (req, res, proximo) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.carregar();
        await fornecedor.remover();
        res.status(204);
        res.end();
    } catch (erro) {
        proximo(erro);
    }

})

module.exports = roteador;