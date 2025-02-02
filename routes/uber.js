const express = require("express");
const router = express.Router();
const uber = require("../controllers/uberController")
const { setTimeout: sleep } = require('timers/promises');

router.get("/data/:up", (req, res) => {
    if(req.params.up == "true"){
        uber.dataUpdate(true);
    }  
    else{
        uber.dataUpdate(false);
    }
    res.redirect("/uber")
})

router.get("/", (req, res) => {
    const data = uber.getData();
    uber.findAll(data).then( async (resp) => {
        const total = await uber.findAllTotal(data);
        res.render("uber/home", {registros:resp, data:data, total:total});
    }).catch((erro) => {
        console.log("Erro ao listar registros --> " + erro);
        res.redirect("/");
    })
})

router.get("/add", (req, res) => {
    res.render("uber/add", {data:{
        dia:new Date().getDate(),
        mes: new Date().getMonth() + 1,
        ano:new Date().getFullYear()
    }});
})

router.post("/add/post", (req, res) => {
    uber.addRegistro({
        ganho:req.body.ganho,
        kmi:req.body.kmi,
        kmf:req.body.kmf,
        gasolina:req.body.gasolina,
        carro:req.body.carro,
        dia:req.body.dia,
        mes:req.body.mes - 1,
        ano:req.body.ano,
    }).then((resp) => {
        console.log("Ok")
        res.redirect("/uber");
    }).catch((erro) => {
        console.log("Erro --> " + erro)
        res.redirect("/uber");
    })
});

router.get("/edit/:id", (req, res) => {
    uber.findOneId(req.params.id).then((resp) => {
        //console.log(resp)
        res.render("uber/edit", {registro:resp, data:{
            dia:resp.data.getDate(),
            mes:resp.data.getMonth() + 1,
            ano:resp.data.getFullYear()
        }});    
    }).catch((erro) => {
        console.log("Erro --> " + erro);
        res.redirect("/uber")
    })
})

router.post("/edit/post", (req, res) => {
    uber.editRegistro({
        ganho:req.body.ganho,
        kmi:req.body.kmi,
        kmf:req.body.kmf,
        gasolina:req.body.gasolina,
        carro:req.body.carro,
        id:req.body.id,
        dia:req.body.dia,
        mes:req.body.mes - 1,
        ano:req.body.ano,
    }).then(async (resp) => {
        await sleep(1000);
        res.redirect("/uber");
    }).catch((erro) => {
        console.log("Erro --> " + erro);
        res.redirect("/uber");
    });
});

router.get("/delete/:id", (req, res) => {
    uber.deleteRegistro(req.params.id).then( async (resp) => {
        await sleep(1000);
        res.redirect("/uber");
    }).catch((erro) => {
        console.log("Erro ao tentar deletar --> " + erro);
        res.redirect("/uber");  
    })
})

module.exports = router;