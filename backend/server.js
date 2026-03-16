// ===============================
// IMPORTS
// ===============================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer"); // ✅ ADDED

// Load environment variables FIRST
dotenv.config();

// ===============================
// DATABASE CONNECTION
// ===============================
const connectDB = require("./config/db");

// ===============================
// ROUTES
// ===============================
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes"); // ✅ ADD THIS

// ===============================
// INITIAL SETUP
// ===============================
connectDB();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/reviews", require("./routes/reviewRoutes"));

// ===============================
// API ROUTES
// ===============================

// Authentication
app.use("/api/auth", authRoutes);

// Movies API
app.use("/api/movies", movieRoutes); // ✅ ADD THIS

// ===============================
// EMAIL TEST ROUTE
// ===============================
app.get("/test-email", async (req, res) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Movie Ticket App Email Test",
            text: "Your email system is working successfully 🎉"
        });

        res.send("✅ Email sent successfully!");

    } catch (error) {
        console.log(error);
        res.send("❌ Email failed");
    }
});

// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
    res.send("🎬 Movie Ticket Backend API Running Successfully...");
});

// ===============================
// SERVER START
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});