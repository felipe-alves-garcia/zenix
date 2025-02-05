const { Uber } = require("../models/Uber");
const { BackupUber } = require("../models/Uber");
const { Data } = require("../models/Uber");

async function getData(){
    var data = await Data.findOne().lean();
    if(data == null){
        data = new Data({
            mes:1,
            ano:2025
        });
        data.save().then((resp) => {
            return data;
        }).catch((erro) => {
            console.log("Erro")
        })
    }
    return data;
}

async function dataUpdate (up){
    var data = await Data.findOne();
    if(up){
        if(data.mes == 12){
            data.mes = 1;
            data.ano++;
            await data.save();
            return data;
        }
        else{
            data.mes++;
            await data.save();
            return data;
        }
    }
    else{
        if(data.mes == 1){
            data.mes = 12;
            data.ano--;
            await data.save();
            return data;
        }
        else{
            data.mes--;
            await data.save();
            return data;
        }
    }
}

async function findAll (data){
    const inicio = new Date(data.ano, data.mes -1, 1);
    const final = new Date(data.ano, data.mes, 1);
    const registros = Uber.find({
        data:{$gte:inicio, $lt:final}
    }).sort({data:1}).lean().then((resp) => {
        var i = 0;
        resp.forEach((dados) => {
            i++;
            dados.id = i;
            //var data = new Date(dados.data);
            var dataAjustada = dados.data.toISOString().split("T")[0];
            dados.data = dataAjustada;
        });
        return resp;
    }).catch((erro) => {
        console.log("Erro ao distribuir ids --> " + erro);
    })
    return registros;
}

async function findAllTotal (data){
    const inicio = new Date(data.ano, data.mes -1, 1);
    const final = new Date(data.ano, data.mes, 1);
    const registros = Uber.find({
        data:{$gte:inicio, $lt:final}
    }).sort({data:1}).lean().then((resp) => {
        var lucro = 0;
        var despesa = 0;
        var ganho = 0;
        var kmv = 0;
        resp.forEach((dados) => {
            lucro += dados.lucro;
            despesa += dados.despesa;
            ganho += dados.ganho;
            kmv += dados.kmv;
        });
        return {
            lucro:Number(lucro.toFixed(2)),
            despesa:Number(despesa.toFixed(2)),
            ganho:Number(ganho.toFixed(2)),
            kmv:Number(kmv.toFixed(2))
        };
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
        data:new Date(dados.ano, dados.mes, dados.dia),
    })
    const backupRegistro = new BackupUber({
        id:0,
        ganho:dados.ganho,
        kmi:dados.kmi,
        kmf:dados.kmf,
        kmv:kmv,
        gasolina:dados.gasolina,
        carro:dados.carro,
        despesa: despesa,
        lucro:lucro,
        data:new Date(dados.ano, dados.mes, dados.dia),
    })
    registro.save().then((resp) => {
        console.log("Salvo");
        backupRegistro.save().then((resp) => {
            console.log("Backup salvo");
        }).catch((erro) => {
            console.log("Erro ao salvar backup --> " + erro);
        })
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
        resp.data = new Date(newRegistro.ano, newRegistro.mes, newRegistro.dia);
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

module.exports = { getData, dataUpdate, addRegistro, findAll, findAllTotal, findOneId, editRegistro, deleteRegistro }