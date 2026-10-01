const express = require("express");
const app = express();
const users = [];

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Escape API funcionando!" });
});

app.post("/test", (req, res) => {
    console.log(req.body);

    res.json({
        message: "Dados recebidos!"
    });
});

app.post("/users", (req, res) => {
    const user = req.body;

    users.push(user);

    res.json(user);
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.put("/users", (req, res) => {
    const user = users.find((user) => user.nick === req.body.nick);

    user.idade = req.body.idade;

    res.json(user);
});

app.delete("/users", (req, res) => {
    const index = users.findIndex((user) => {
        user.nick === req.body.nick;
    });

    if (index === -1) {
        return res.status(404).json({
            message: "Usuário não encontrado"
        });
    }

    users.splice(index, 1);

    res.json({
        message: "Usuário excluído com sucesso!"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});