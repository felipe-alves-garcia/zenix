const express = require("express");
const router = express.Router();
const uber = require("../controllers/uberController")

router.get("/", (req, res) => {
    uber.registros().then((resp) => {
        console.log(resp);
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
})

module.exports = router;