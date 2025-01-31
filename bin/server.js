const app = require("../app");

const PORT = 7777;

app.listen(PORT, () => {
    console.log("Servidor rodando em http://localhost:"+PORT);
})