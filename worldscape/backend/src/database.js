const Database = require("better-sqlite3");

const db = new Database("database.db");

db.pragma("foreign_keys = ON")

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nick TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        tipo TEXT NOT NULL,
        user_id INTGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )    
`).run();

const addUser = db.prepare(`
    INSERT INTO users (nick, senha)
    VALUES (?, ?)
`);

const getUserByNick = db.prepare(`
    SELECT * FROM users
    WHERE nick = ?
`);

const getUserById = db.prepare(`
    SELECT id, nick FROM users
    WHERE id = ?
`);

const deleteUserById = db.prepare(`
    DELETE FROM users
    WHERE id = ?    
`);

const addItem = db.prepare(`
    INSERT INTO items (titulo, tipo, user_id)
    VALUES (?, ?, ?)
`);

const getItemsByUserId = db.prepare(`
    SELECT id, titulo, tipo
    FROM items
    WHERE user_id = ?    
`);

const updateItem = db.prepare(`
    UPDATE items
    SET titulo = ?, tipo = ?
    WHERE id = ? AND user_id = ?
`);

const deleteItem = db.prepare(`
    DELETE FROM items
    WHERE id = ? AND user_id = ?
`);

module.exports = {
    db,
    addUser,
    getUserByNick,
    getUserById,
    deleteUserById,
    addItem,
    getItemsByUserId,
    updateItem,
    deleteItem
};