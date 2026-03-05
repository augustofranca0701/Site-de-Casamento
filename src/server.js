const express = require("express")
const cors = require("cors")

const db = require("./config/database")
const initializeDatabase = require("./services/seedService")
initializeDatabase()

const eventsRoutes = require("./routes/eventsRoutes")
const giftRoutes = require("./routes/giftRoutes")
const rsvpRoutes = require("./routes/rsvpRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    status: "API running"
  })
})

app.use("/api/events", eventsRoutes)
app.use("/api/gifts", giftRoutes)
app.use("/api/rsvp", rsvpRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const path = require("path")

const frontendPath = path.resolve(__dirname, "../frontend/dist")

app.use(express.static(frontendPath))

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"))
})