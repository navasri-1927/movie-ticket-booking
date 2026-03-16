const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createBooking, getMyBookings } = require("../controllers/bookingController");

// User booking
router.post("/", protect, createBooking);

// Get booking history
router.get("/my-bookings", protect, getMyBookings);

module.exports = router;