const Tabela = require('./TabelaProduto');
const DadosNaoFornecidos = require('../../../erros/DadosNaoFornecidos');
const CampoInvalido = require('../../../erros/CampoInvalido');

class Produto {
    constructor ({ id, titulo, preco, estoque, fornecedor, dataCriacao, dataAtualizacao, versao}) {
        this.id = id;
        this.titulo = titulo;
        this.preco = preco;
        this.estoque = estoque;
        this.fornecedor = fornecedor;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
        console.log(fornecedor);
    }

    async criar () {
        this.validar()
        const resultado = await Tabela.inserir({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        })

        this.id = resultado.id;
        this.dataCriacao = resultado.dataCriacao;
        this.dataAtualizacao = resultado.dataAtualizacao;
        this.versao = resultado.versao;
    }

    apagar () {
        return Tabela.remover(this.id, this.fornecedor);
    }

    validar () {
        if (typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new CampoInvalido('titulo');
        }
        if (typeof this.preco !== 'number' || this.preco === 0) {
            throw new CampoInvalido('preco');
        }
    }

    async carregar () {
        const encontrado = await Tabela.pegarPorId(this.id, this.fornecedor);
        this.titulo = encontrado.titulo;
        this.preco = encontrado.preco;
        this.estoque = encontrado.estoque;
        this.fornecedor = encontrado.fornecedor;
        this.dataCriacao = encontrado.dataCriacao;
        this.dataAtualizacao = encontrado.dataAtualizacao;
        this.versao = encontrado.versao;
    }

    atualizar () {
        const dadosParaAtualizar = {};
        
        if (typeof this.titulo == 'string' && this.titulo.length > 0) {
            dadosParaAtualizar.titulo = this.titulo;
        }

        if (typeof this.preco == 'number' && this.preco > 0) {
            dadosParaAtualizar.preco = this.preco;
        }
        
        if (typeof this.estoque == 'number') {
            dadosParaAtualizar.titulo = this.titulo;
        }

        if (Object.keys(dadosParaAtualizar).length == 0) {
            throw new DadosNaoFornecidos();
        }

        return Tabela.atualizar(
            {
                id: this.id,
                fornecedor: this.fornecedor
            },
            dadosParaAtualizar
        )
    }

    diminuirEstoque () {
        return Tabela.subtrair(
            this.id,
            this.fornecedor,
            'estoque',
            this.estoque
        )
    }

}

module.exports = Produto;