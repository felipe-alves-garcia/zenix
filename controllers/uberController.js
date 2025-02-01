const Uber = require("../models/Uber");

async function registros (){
    const registros = Uber.find().lean().then((resp) => {
        var i = 0;
        resp.forEach((dados) => {
            i++;
            dados.id = i;
            var data = new Date(dados.data);
            data = data.toISOString().split("T")[0];
            dados.data = data;
        });
        console.log(resp)
        return resp;
    }).catch((erro) => {
        console.log("Erro ao distribuir ids --> " + erro);
    })
    return registros;
}

async function addRegistro (dados){
    var kmv = dados.kmf - dados.kmi;
    var despesa = kmv / dados.carro * dados.gasolina;
    despesa = Number(despesa.toFixed(2));
    var lucro = dados.ganho - despesa;
    const registro = new Uber({
        id:0,
        ganho:dados.ganho,
        kmi:dados.kmi,
        kmf:dados.kmf,
        kmv:kmv,
        gasolina:dados.gasolina,
        carro:dados.carro,
        despesa: despesa,
        lucro:lucro,
        data:Date.now(),
    })
    registro.save().then((resp) => {
        console.log("Salvo");
    }).catch((erro) => {
        console.log("Erro ao salvar --> " + erro);
    })
}

module.exports = { addRegistro, registros }