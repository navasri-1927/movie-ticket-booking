const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { generateTicket } = require("../controllers/ticketController");

router.get("/:bookingId", protect, generateTicket);

module.exports = router;