const express = require("express")
const router = express.Router()

const giftController = require("../controllers/giftController")

router.post("/:id/reserve", giftController.reserveGift)
router.post("/", giftController.createGift)

module.exports = router