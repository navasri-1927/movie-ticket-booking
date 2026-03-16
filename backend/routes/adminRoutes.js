const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getDashboardStats, getRevenuePerMovie } = require("../controllers/adminController");

router.get("/stats", protect, adminOnly, getDashboardStats);
router.get("/revenue-per-movie", protect, adminOnly, getRevenuePerMovie);

module.exports = router;