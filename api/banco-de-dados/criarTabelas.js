// Cria as tabelas no banco de dados
// Cria a tabela do Fornecedor

const modelos = [
    require('../rotas/fornecedores/modeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto')
]

async function criarTabelas () {
    for (let contador = 0; contador < modelos.length; contador++) {
        const modelo = modelos[contador];
        await modelo.sync();
    }
}

criarTabelas();

// ModeloTabela
//     .sync()
//     .then(() => {
//         console.log('Tabela criada com sucesso!')
//     })
//     .catch(console.log());