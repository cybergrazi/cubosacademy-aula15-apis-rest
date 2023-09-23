const express = require("express");
const rotas = require("./rotas");

const app = express();

app.use(express.json()); //isso é para que o servidor aceite as requisições somente no formato JSON

app.use(rotas); // importou as rotas

app.listen(3000);