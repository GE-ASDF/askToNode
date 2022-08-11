const Sequelize = require("sequelize");
const connection = require("./database");

// Criando tabela no banco de dados juntamente com cada um dos campos
const Pergunta = connection.define("pergunta",{
    titulo:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    descricao:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

Pergunta.sync({force: false}).then(()=>{});

module.exports = Pergunta;