const express = require("express")
const router = express.Router()

const eventController = require("../controllers/eventController")
const giftController = require("../controllers/giftController")

router.get("/", eventController.getEvents)
router.get("/:slug", eventController.getEventBySlug)
router.get("/:slug/gifts", giftController.getGiftsByEventSlug)
router.get("/:slug/guests", eventController.getEventGuests)
router.get("/:slug/stats", eventController.getEventStats)

module.exports = router