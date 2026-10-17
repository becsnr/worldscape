const Database = require("better-sqlite3");

const db = new Database("database.db");

db.pragma("foreign_keys = ON"); // ativa a verificação dos relacionamentos entre tabelas

// criar tabela dos usuários
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nick TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )
`).run();

// criar tabela de itens dos usuários
db.prepare(`
    CREATE TABLE IF NOT EXISTS itemsUsers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        tipo TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )    
`).run();

// CONFERIR O RESULTADO DA RENOMEAÇÃO
const tabelas = db.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
`).all();

console.log("Tabelas encontradas:", tabelas);

// cadastrar usuário
const addUser = db.prepare(`
    INSERT INTO users (nick, senha)
    VALUES (?, ?)
`);

// buscar usuário pelo nick
const getUserByNick = db.prepare(`
    SELECT * FROM users
    WHERE nick = ?
`);

// buscar usuário pelo id
const getUserById = db.prepare(`
    SELECT id, nick FROM users
    WHERE id = ?
`);

// deletar usuário pelo id
const deleteUserById = db.prepare(`
    DELETE FROM users
    WHERE id = ?    
`);

// add item para um usuário
const addItem = db.prepare(`
    INSERT INTO itemsUsers (titulo, tipo, user_id)
    VALUES (?, ?, ?)
`);

// buscar itens de um usuário
const getItemsUsersByUserId = db.prepare(`
    SELECT id, titulo, tipo
    FROM itemsUsers
    WHERE user_id = ?    
`);

// atualizar item de usuário
const updateItem = db.prepare(`
    UPDATE itemsUsers
    SET titulo = ?, tipo = ?
    WHERE id = ? AND user_id = ?
`);

// deletar item de um usuário
const deleteItem = db.prepare(`
    DELETE FROM itemsUsers
    WHERE id = ? AND user_id = ?
`);

module.exports = {
    db,
    addUser,
    getUserByNick,
    getUserById,
    deleteUserById,
    addItem,
    getItemsUsersByUserId,
    updateItem,
    deleteItem
};