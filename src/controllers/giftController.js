const db = require("../config/database")

exports.getGiftsByEventSlug = (req, res) => {

  const slug = req.params.slug

  const query = `
    SELECT gifts.*
    FROM gifts
    JOIN events ON gifts.event_id = events.id
    WHERE events.slug = ?
  `

  db.all(query, [slug], (err, rows) => {

    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.json(rows)

  })

}

exports.reserveGift = (req, res) => {

  const giftId = req.params.id
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: "Name is required" })
  }

  db.get(
    "SELECT * FROM gifts WHERE id = ?",
    [giftId],
    (err, gift) => {

      if (err) {
        return res.status(500).json({ error: err.message })
      }

      if (!gift) {
        return res.status(404).json({ error: "Gift not found" })
      }

      if (gift.reserved) {
        return res.status(400).json({ error: "Gift already reserved" })
      }

      db.run(
        "UPDATE gifts SET reserved = 1, reserved_by = ? WHERE id = ?",
        [name, giftId],
        function(err) {

          if (err) {
            return res.status(500).json({ error: err.message })
          }

          res.json({
            message: "Gift reserved successfully"
          })

        }
      )

    }
  )

}

exports.createGift = (req, res) => {

  const { event_id, name, description } = req.body

  db.run(
    `INSERT INTO gifts (event_id, name, description)
     VALUES (?, ?, ?)`,
    [event_id, name, description],
    function(err) {

      if (err) {
        return res.status(500).json({ error: err.message })
      }

      res.json({
        message: "Gift created",
        id: this.lastID
      })

    }
  )

}