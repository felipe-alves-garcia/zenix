
//-----||-----//
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("connect-flash");
//const session = require("express-session");

//-----Configurações-----//

    //session e flash
    /*app.use(session({
        secret:"zenix12321",
        resave:true,
        saveUninitialized:true,
    }));*/
    app.use(flash());
    //Middlewares
    app.use((req, res, next) => {
        
        next();
    });
    //Handlebars
    app.engine("handlebars", engine({defaultLayout:"main"}));
    app.set("view engine", "handlebars");
    app.set("views", path.join(__dirname, "views"));
    //Body-parser
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    //public
    app.use(express.static("public"));

//-----DB-----//

const db = require("./models/db");
db.conexaoDB();

//-----Rotas-----//

app.get("/", (req, res) => {
    res.render("home");
})

//

const uber = require("./routes/uber");
app.use("/uber", uber);

//

const xgames = require("./routes/xgames");
app.use("/xgames", xgames);

//-----Exportação-----//

module.exports = app;