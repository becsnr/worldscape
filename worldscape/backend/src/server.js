const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { db, addUser, getUserByNick, getUserById, deleteUserById } = require("./database");

const JWT_SECRET = "minha-chave-secreta";

const app = express();

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

// CRIAR CONTA
app.post("/users", async (req, res) => {
    const nick = req.body.nick?.trim();
    const senha = req.body.senha;

    if (!nick || !senha) {
        return res.status(400).json({
            message: "Nick e senha são obrigatórios!"
        });
    }

    if (nick.length < 3) {
        return res.status(400).json({
            message: "O nick deve ter pelo menos 3 caracteres!"
        });
    }

    if (senha.length < 6) {
        return res.status(400).json({
            message: "A senha deve ter pelo menos 6 caracteres!"
        });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    try {
        addUser.run(nick, senhaHash);

        res.json({
        message: "Usuário criado com sucesso!",
        nick
        });
    } catch (error) {
        res.status(400).json({
            message: "Esse nick já existe!"
        });
    }
});

// FAZER LOGIN
app.post("/login", async (req, res) => {
    const nick = req.body.nick?.trim();
    const senha = req.body.senha;

    if (!nick || !senha) {
        return res.status(400).json({
            message: "Nick e senha são obrigatórios!"
        });
    }

    const user = getUserByNick.get(nick);

    if (!user) {
        return res.status(404).json({
            message: "Usuário não encontrado!"
        });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
        return res.status(401).json({
            message: "Senha incorreta!"
        });
    }

    const token = jwt.sign(
        { id: user.id, nick: user.nick },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login realizado com sucesso!",
        nick: user.nick,
        token
    });
});

// LISTAR USUÁRIOS
app.get("/users", (req, res) => {
    const users = db.prepare(`
            SELECT id, nick FROM users
        `).all();

    res.json(users);
});

// BUSCAR USUÁRIO
app.get("/users/:nick", (req, res) => {
    const { nick } = req.params;

    const user = getUserByNick.get(nick);

    if (!user) {
        return res.status(404).json({
            message: "Usuário não encontrado!"
        });
    }

    res.json({
        id: user.id,
        nick: user.nick
    });
});

// PERFIL
function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token não fornecido!"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const usuario = jwt.verify(token, JWT_SECRET);

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido ou expirado!"
        });
    }
}

app.get("/perfil", verificarToken, (req, res) => {
    const usuario = getUserById.get(req.usuario.id);

    if (!usuario) {
        return res.status(404).json({
            message: "Usuário não encontrado!"
        });
    }

    res.json({
        message: "Você está na área protegida!",
        usuario
    });
});

// EXCLUIR USUÁRIO
app.delete("/users", verificarToken, (req, res) => {
    const id = req.usuario.id;

    const resultado = deleteUserById.run(id);

    if (resultado.changes === 0) {
        return res.status(404).json({
            message: "Usuário não encontrado!"
        });
    }

    res.json({
        message: "Usuário excluído com sucesso!"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});