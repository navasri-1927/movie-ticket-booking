const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { createTheatre, getTheatres } = require("../controllers/theatreController");

router.get("/", getTheatres);
router.post("/", protect, adminOnly, createTheatre);

module.exports = router;