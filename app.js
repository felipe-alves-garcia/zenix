//-----Models-----//

const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");

//-----Configurações-----//

    //session e flash
    app.use(session({
        secret:"zenix12321",
        resave:true,
        saveUninitialized:true,
    }));
    app.use(flash());
    //Middlewares
    app.use((req, res, next) => {
        
        next();
    });
    //Handlebars
    app.engine("handlebars", engine({defaultLayout:"main"}));
    app.set("view engine", "handlebars");
    //Body-parser
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    //public
    app.use(express.static(path.join(__dirname, "public")));

//-----Rotas-----//

app.get("/", (req, res) => {
    res.send("home");
})

//-----Exportação-----//

module.exports = app;