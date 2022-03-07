const Sequelize = require('sequelize');
// const config = require('config');

const instancia = new Sequelize(
    // config.get('mysql.banco-de-dados'),
    // config.get('mysql.usuario'),
    // config.get('mysql.senha'),
    // {
    //     host: config.get('mysql.host'),
    //     dialect: 'mysql'
    // }

    process.env.Usuario,
    process.env.Senha,
    process.env.Banco-de-dados,
    {
        host: process.env.Host,
        dialect: 'mysql'
    }
);

module.exports = instancia;