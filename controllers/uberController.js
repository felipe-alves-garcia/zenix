const Uber = require("../models/Uber");

async function registros (){
    return Uber.find().lean();
}

async function addRegistro (dados){
    var kmv = dados.kmf - dados.kmi;
    var despesa = kmv / dados.carro * dados.gasolina;
    despesa = Number(despesa.toFixed(2));
    var lucro = dados.ganho - despesa;
    const registro = new Uber({
        //id:ids,
        ganho:dados.ganho,
        kmi:dados.kmi,
        kmf:dados.kmf,
        kmv:kmv,
        gasolina:dados.gasolina,
        carro:dados.carro,
        despesa: despesa,
        lucro:lucro,
        data:new Date(new Date().toISOString().split("T")[0])
    })
    registro.save().then((resp) => {
        console.log("Salvo");
    }).catch((erro) => {
        console.log("Erro ao salvar --> " + erro);
    })
}

module.exports = { addRegistro, registros }