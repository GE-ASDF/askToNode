const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('resposta', {
    corpo:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    idpergunta:{
        type: Sequelize.BIGINT,
        allowNull:false,
    }
});
Resposta.sync({force: false});

module.exports = Resposta;