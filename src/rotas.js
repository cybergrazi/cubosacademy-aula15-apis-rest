const express = require("express");
const instrutores = require("./controladores/instrutores");


const rotas = express();
// a rota abaixo é como o que usamos nas aulas anteriores, chamado de "dev", mas mudou o nome
rotas.get("/instrutores", instrutores.listarInstrutores);
rotas.get("/instrutores/:id", instrutores.obterInstrutor);
rotas.post("/instrutores", instrutores.cadastrarInstrutor); // não tem problema criar mesmos end points com verbos diferentes | importado aqui o cadastro pois a pasta controladora de instrutores já foi previamente importada
rotas.put("/instrutores/:id", instrutores.atualizarInstrutor); // atualização das informações de um instrutor
rotas.patch("/instrutores/:id/status", instrutores.atualizarStatus); // atualicação de alguma informação específica de um instrutor
rotas.delete("/instrutores/:id", instrutores.deletarInstrutor); // deletar um instrutor

module.exports = rotas;