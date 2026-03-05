const db = require("../config/database")

exports.getEvents = (req, res) => {

  db.all("SELECT * FROM events", [], (err, rows) => {

    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.json(rows)

  })

}

exports.getEventBySlug = (req, res) => {

  const slug = req.params.slug

  db.get(
    "SELECT * FROM events WHERE slug = ?",
    [slug],
    (err, row) => {

      if (err) {
        return res.status(500).json({ error: err.message })
      }

      if (!row) {
        return res.status(404).json({ error: "Event not found" })
      }

      res.json(row)

    }
  )

}

exports.getEventGuests = (req, res) => {

  const slug = req.params.slug

  const query = `
    SELECT guests.*
    FROM guests
    JOIN events ON guests.event_id = events.id
    WHERE events.slug = ?
  `

  db.all(query, [slug], (err, rows) => {

    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.json(rows)

  })

}

exports.getEventStats = (req, res) => {

  const slug = req.params.slug

  const query = `
    SELECT
      COUNT(guests.id) AS total_rsvps,
      SUM(CASE WHEN guests.attending = 1 THEN 1 ELSE 0 END) AS confirmed,
      SUM(guests.guests_count) AS companions
    FROM guests
    JOIN events ON guests.event_id = events.id
    WHERE events.slug = ?
  `

  db.get(query, [slug], (err, row) => {

    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.json(row)

  })

}