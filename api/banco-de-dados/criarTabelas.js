// Cria as tabelas no banco de dados
// Cria a tabela do Fornecedor

const ModeloTabela = require('../rotas/fornecedores/modeloTabelaFornecedor');

ModeloTabela
    .sync()
    .then(() => {
        console.log('Tabela criada com sucesso!')
    })
    .catch(console.log());