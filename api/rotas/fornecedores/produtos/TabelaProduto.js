// DAO = Data Access Object

const Modelo = require('./ModeloTabelaProduto');

module.exports = {
    // Pegando objetos a partir do id do fornecedor
    listar (idFornecedor) {
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            },
            raw: true
        });
    },

    inserir (dados) {
        return Modelo.create(dados);
    },

    remover (idProduto, idFornecedor) {
        return Modelo.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    },

    async pegarPorId(idProduto, idFornecedor) {
        const encontrado = await Modelo.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            },
            raw: true
        })

        if (!encontrado) {
            throw new Error('produto não foi encontrado');
        }

        return encontrado;
    }
}