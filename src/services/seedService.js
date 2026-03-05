const db = require("../config/database")

function initializeDatabase() {

  db.serialize(() => {

db.run(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    slug TEXT UNIQUE,
    date TEXT,
    location TEXT
  )
`)

db.get("SELECT * FROM events LIMIT 1", (err, row) => {

  if (!row) {

    db.run(`
      INSERT INTO events (name, slug, date, location)
      VALUES (
        "Casamento Ana & Lucas",
        "ana-e-lucas",
        "2026-11-15",
        "Goiânia"
      )
    `)

  }

})

db.get("SELECT * FROM gifts LIMIT 1", (err, row) => {

  if (!row) {

    db.run(`
      INSERT INTO gifts (event_id, name, description)
      VALUES
      (1, "Air Fryer", "Para receitas rápidas"),
      (1, "Jogo de Panelas", "Panelas antiaderentes"),
      (1, "Liquidificador", "Para sucos e vitaminas"),
      (1, "Jogo de Taças", "Para vinho")
    `)

  }

})

    db.run(`
      CREATE TABLE IF NOT EXISTS guests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER,
        name TEXT,
        email TEXT,
        attending INTEGER,
        guests_count INTEGER,
        message TEXT
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS gifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER,
        name TEXT,
        description TEXT,
        reserved INTEGER DEFAULT 0,
        reserved_by TEXT
      )
    `)

  })

}

module.exports = initializeDatabase