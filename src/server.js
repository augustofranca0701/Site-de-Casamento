const express = require("express")
const cors = require("cors")
const path = require("path")

const db = require("./config/database")
const initializeDatabase = require("./services/seedService")
initializeDatabase()

const eventsRoutes = require("./routes/eventsRoutes")
const giftRoutes = require("./routes/giftRoutes")
const rsvpRoutes = require("./routes/rsvpRoutes")

const app = express()

app.use(cors())
app.use(express.json())

// ================= API =================

app.get("/api", (req, res) => {
  res.json({
    status: "API running"
  })
})

app.use("/api/events", eventsRoutes)
app.use("/api/gifts", giftRoutes)
app.use("/api/rsvp", rsvpRoutes)

// ================= FRONTEND =================

const frontendPath = path.resolve(__dirname, "../frontend/dist")

// servir arquivos estáticos do Vue
app.use(express.static(frontendPath))

// rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"))
})

// fallback para SPA
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next()
  res.sendFile(path.join(frontendPath, "index.html"))
})

// ================= SERVER =================

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})