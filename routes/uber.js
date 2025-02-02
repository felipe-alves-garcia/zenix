const express = require("express");
const router = express.Router();
const uber = require("../controllers/uberController")
const { setTimeout: sleep } = require('timers/promises');

router.get("/", (req, res) => {
    uber.findAll().then((resp) => {
        res.render("uber/home", {registros:resp});
    }).catch((erro) => {
        console.log("Erro ao listar registros --> " + erro);
        res.render("uber/home");
    })
})

router.get("/add", (req, res) => {
    res.render("uber/add");
})

router.post("/add/post", (req, res) => {
    uber.addRegistro({
        ganho:req.body.ganho,
        kmi:req.body.kmi,
        kmf:req.body.kmf,
        gasolina:req.body.gasolina,
        carro:req.body.carro
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
        res.render("uber/edit", {registro:resp});    
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
        id:req.body.id
    }).then(async (resp) => {
        await sleep(1500);
        res.redirect("/uber");
    }).catch((erro) => {
        console.log("Erro --> " + erro);
        res.redirect("/uber");
    });
});

router.get("/delete/:id", (req, res) => {
    uber.deleteRegistro(req.params.id).then( async (resp) => {
        await sleep(1500);
        res.redirect("/uber");
    }).catch((erro) => {
        console.log("Erro ao tentar deletar --> " + erro);
        res.redirect("/uber");  
    })
})

module.exports = router;