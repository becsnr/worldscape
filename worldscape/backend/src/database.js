const Database = require("better-sqlite3");

const db = new Database("database.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nick TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
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

const deleteUser = db.prepare(`
    DELETE FROM users
    WHERE nick = ?
`)

module.exports = {
    db,
    addUser,
    getUserByNick,
    deleteUser
};