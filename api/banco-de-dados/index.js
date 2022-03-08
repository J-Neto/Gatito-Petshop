// Arquivo de credenciais de conexão do banco-de-dados

const Sequelize = require('sequelize');
const config = require('config');

const instancia = new Sequelize(
    config.get('mysql.banco-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'),
    {
        host: config.get('mysql.host'),
        dialect: 'mysql',
        port: config.get('mysql.port')
    }

    // process.env.Banco_de_dados,
    // process.env.Usuario,
    // process.env.Senha,
    // {
    //     dialect: 'mysql',
    //     host: process.env.Host,
    //     port: process.env.port
    // }
);

module.exports = instancia;