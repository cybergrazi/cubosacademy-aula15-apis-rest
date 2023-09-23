let { instrutores, identificadorInstrutor } = require("../bancodedados");
//let { identificadorInstrutor } = require("../bancodedados");
// acima foram unidas as 2 desestruturações

// controlador para lista de instrutores
const listarInstrutores = (req, res) => {
    return res.json(instrutores);
};

// controlador para filtrar instrutores
const obterInstrutor = (req, res) => {
    const { id } = req.params;

    const instrutor = instrutores.find((instrutor) => { // find busca dentro do array o parametro da url
        return instrutor.id === Number(id);
    });

    if (!instrutor) { // se não existir, retorna resposta status de erro 404 e uma mensagem em JSON
        return res.status(404).json({ mensagem: "Instrutor não encontrado." });
    };

    return res.status(200).json({ instrutor });// não precisa mas foi colocado por questões didáticas.
};

// controlador para adicionar um novo instrutor
const cadastrarInstrutor = (req, res) => {
    const { nome, email, status } = req.body;

    if (!nome) {
        return res.status(400).jso({ mensgem: "O nome é obrigatório" }); // bad request - requisição foi com a sintaxe inválida, ou seja, não foi enviado o nome.
    };

    if (!email) {
        return res.status(400).jso({ mensgem: "O email é obrigatório" });
    };

    const instrutor = {
        id: identificadorInstrutor++,
        nome, // como é o mesmo nome da requisição, não é necessário passar os dois pontos e o nome da propriedade
        email,
        status: status ?? true // aqui, se a informação status não for enviada, ele envia automaticamente true.
    };

    instrutores.push(instrutor);

    return res.status(201).json(instrutor); // status created, algo foi criado dentro de uma coleção
};

// controlador para atualizar as informações de um instrutor
const atualizarInstrutor = (req, res) => {
    const { id } = req.params; // requisição do parâmetro ID passado, para atualizar o instrutor com este ID
    const { nome, email, status } = req.body;

    if (!nome) {
        return res.status(400).jso({ mensgem: "O nome é obrigatório" }); // bad request - requisição foi com a sintaxe inválida, ou seja, não foi enviado o nome.
    };

    if (!email) {
        return res.status(400).jso({ mensgem: "O email é obrigatório" });
    };

    const instrutor = instrutores.find((instrutor) => { // find busca dentro do array o parametro da url
        return instrutor.id === Number(id);
    });

    if (!instrutor) { // se não existir, retorna resposta status de erro 404 e uma mensagem em JSON
        return res.status(404).json({ mensagem: "Instrutor não encontrado." });
    };

    instrutor.nome = nome;
    instrutor.email = email;
    instrutor.status = status;

    return res.status(204).send(); // no content - sucesso mas não foi retornado nada | usado o send () pois foi necessário somente enviar o status.
};

// controlador para atualizar somente o status de um instrutor
const atualizarStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // requisição do status colocado no Insomnia

    const instrutor = instrutores.find((instrutor) => { // find busca dentro do array o parametro da url
        return instrutor.id === Number(id);
    });

    if (!instrutor) { // se não existir, retorna resposta status de erro 404 e uma mensagem em JSON
        return res.status(404).json({ mensagem: "Instrutor não encontrado." });
    };

    instrutor.status = status;

    return res.status(204).send();
};

//controlador para deletar um instrutor
const deletarInstrutor = (req, res) => {
    const { id } = req.params;

    const instrutor = instrutores.find((instrutor) => { // find busca dentro do array o parametro da url
        return instrutor.id === Number(id);
    });

    if (!instrutor) { // se não existir, retorna resposta status de erro 404 e uma mensagem em JSON
        return res.status(404).json({ mensagem: "O instrutor não existe." });
    };

    instrutores = instrutores.filter((instrutor) => {
        return instrutor.id !== Number(id); // aqui está filtrando todos os instrutores que são diferentes do instrutor que queremos excluir, sobrescrevendo já a lista de instrutores antiga
    });

    return res.status(204).send();
};

module.exports = {
    listarInstrutores,
    obterInstrutor,
    cadastrarInstrutor,
    atualizarInstrutor,
    atualizarStatus,
    deletarInstrutor
};