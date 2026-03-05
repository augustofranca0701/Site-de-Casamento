const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const dbPath = path.resolve(__dirname, "../../database.db")

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message)
  } else {
    console.log("SQLite conectado")
  }
})

module.exports = db