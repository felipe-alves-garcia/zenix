const Uber = require("../models/Uber");

async function findAll (){
    const registros = Uber.find().lean().then((resp) => {
        var i = 0;
        resp.forEach((dados) => {
            i++;
            dados.id = i;
            var data = new Date(dados.data);
            data = data.toISOString().split("T")[0];
            dados.data = data;
        });
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
    lucro = Number(lucro.toFixed(2));
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

async function findOneId(id){
    const registro = await Uber.findOne({_id:id}).lean().then((resp) => {
        console.log("Ok");
        return resp;
    }).catch((erro) => {
        console.log("Erro ao procurar registro --> " + erro);
    })
    return registro;
}

async function editRegistro(newRegistro){
    await Uber.findOne({_id:newRegistro.id}).then((resp) => {
        resp.ganho = newRegistro.ganho;
        resp.kmi = newRegistro.kmi;
        resp.kmf = newRegistro.kmf;
        resp.gasolina = newRegistro.gasolina;
        resp.carro = newRegistro.carro;
        resp.kmv = resp.kmf - resp.kmi;
        var despesa = resp.kmv / resp.carro * resp.gasolina;
        resp.despesa = Number(despesa.toFixed(2));
        var lucro = resp.ganho - despesa;
        resp.lucro = Number(lucro.toFixed(2));
        resp.save().then((resp) => {
            console.log("Editado com sucesso!");
        }).catch((erro) => {
            console.log("Erro ao editar --> " + erro);
        });
    }).catch((erro) => {
        console.log("Erro na busca para editar --> " + erro);
    });
    return true;
}

async function deleteRegistro (id){
    Uber.deleteOne({_id:id}).then((resp) => {
        console.log("Deletado com sucesso");
    }).catch((erro) => {
        console.log("Erro ao deletar --> " + erro);
    })
}

module.exports = { addRegistro, findAll, findOneId, editRegistro, deleteRegistro }