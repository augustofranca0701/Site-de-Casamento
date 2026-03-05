const express = require("express")
const router = express.Router()

const rsvpController = require("../controllers/rsvpController")

router.post("/:slug", rsvpController.createRSVP)

module.exports = router