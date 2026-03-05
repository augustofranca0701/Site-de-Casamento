const db = require("../config/database")

exports.createRSVP = (req, res) => {

  const slug = req.params.slug

  const { name, email, attending, guests_count, message } = req.body

  if (!name) {
    return res.status(400).json({ error: "Name is required" })
  }

  db.get(
    "SELECT id FROM events WHERE slug = ?",
    [slug],
    (err, event) => {

      if (err) {
        return res.status(500).json({ error: err.message })
      }

      if (!event) {
        return res.status(404).json({ error: "Event not found" })
      }

      db.run(
        `INSERT INTO guests (event_id, name, email, attending, guests_count, message)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          event.id,
          name,
          email || null,
          attending ? 1 : 0,
          guests_count || 0,
          message || null
        ],
        function(err) {

          if (err) {
            return res.status(500).json({ error: err.message })
          }

          res.json({
            message: "RSVP submitted successfully",
            guest_id: this.lastID
          })

        }
      )

    }
  )

}