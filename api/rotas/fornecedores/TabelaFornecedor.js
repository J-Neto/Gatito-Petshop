const Modelo = require('./modeloTabelaFornecedor');

module.exports = {
    listar () {
        return Modelo.findAll();
    },

    inserir (fornecedor) {
        return Modelo.create(fornecedor);
    },
    
    async pegarPorId (id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        });
        if (!encontrado) {
            console.log('Fornecedor não encontrado!');
            throw new Error('Fornecedor não encontrado!');
        }
        return encontrado;
    },

    async atualizar (id, dadosParaAtualizar) {
        // Verificando se o fornecedor buscado existe
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        });

        // Se o fornecedor não existir...
        if(!encontrado) {
            console.log('Fornecedor não encontrado!');
            throw new Error('Fornecedor não encontrado!')
        } else {
            // Se o fornecedor existir...
            return Modelo.update(
                dadosParaAtualizar,
                {
                    where: {
                        id: id
                    }
                }
            )
        }
    },

    async remover (id) {
        return Modelo.destroy({
            where: {
                id: id
            }
        })
    }
}