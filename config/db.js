const Database = require("better-sqlite3");

const db = new Database("cinebox.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS filmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    ano TEXT,
    poster TEXT,
    sinopse TEXT
)
`).run();

module.exports = db;