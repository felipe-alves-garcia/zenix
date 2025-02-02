const mongoose = require("mongoose");

const urlDB = "mongodb+srv://felipe321ag:Tfggames198!@cluster0.8zt8h.mongodb.net/zenix";

async function conexaoDB (){
    mongoose.connect(urlDB).then((resp) => {
        console.log("MongoDB conectado com sucesso!");
    }).catch((erro) => {
        console.log("Erro ao se conectar com MongoDB --> " + erro);
    });
}

module.exports = { conexaoDB }