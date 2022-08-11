const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
/** ESTOU DIZENDO PARA O EXPRESS USAR O EJS COMO VIEW ENGINE */
app.set('view engine', 'ejs');
app.use(express.static('public')); // Possibilita que usemos arquivos estáticos como o CSS

// app.get("/:nome/:lang", function(req, res){
//     let nome = req.params.nome;
//     let lang = req.params.lang;
//     let msg = false;
//     let inscritos = 0;
//     let empresa = "Cronoestudos";
//     let produtos = [
//         {nome: "Doritos", preco:3.14},
//         {nome: "Coca-cola", preco:5},
//         {nome: "Leite", preco:1.45},
//     ]
//     res.render("index", {
//         nome,
//         lang,
//         empresa,
//         inscritos,
//         msg,
//         produtos,
//     });
// })

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com o banco de dados");
    }).catch((msgErro)=>{
        console.log(msgErro)
    });

/* PEGAR AS INFORMAÇÕES DO FORMULÁRIO */
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get("/", function(req, res){
    Pergunta.findAll({raw:true, order:[
        ["id", "DESC"]
    ]}).then(perguntas=>{
    res.render("index",{
        perguntas,
    })
    });
});

app.get("/perguntar", function(req, res){
    res.render("perguntar");
});

app.get("/pergunta/:id", function(req, res){
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta=>{
        if(pergunta){
            Resposta.findAll({ where:{ idpergunta: id }, raw:true, order:[
                ["id", "DESC"]
            ] }).then(respostas=>{
                res.render("pergunta",{ pergunta, respostas })
            });
        }else{
            res.redirect("/");
        } 
    });
});

app.post("/salvarpergunta", function(req, res){
   let titulo = req.body.titulo;
   let descricao = req.body.descricao;
   Pergunta.create({
    titulo: titulo,
    descricao: descricao
   }).then(()=>{
        res.redirect("/perguntar");
   });
});

app.post("/salvaresposta", function(req, res){
    let corpo = req.body.corpo;
    let idpergunta = req.body.idpergunta;
    if(corpo && idpergunta){
        Resposta.create({
            corpo,
            idpergunta
        }).then(()=>{
            res.redirect("/pergunta/"+idpergunta);
        })
    }else{
        res.redirect("/pergunta/"+idpergunta);
    }
})

app.listen(3000, function(erro){
    if(erro){
        console.log("Erro");
    }
})