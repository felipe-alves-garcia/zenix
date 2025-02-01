const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("xgames/home");
})

module.exports = router;