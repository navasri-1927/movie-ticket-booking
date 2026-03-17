// ===============================
// IMPORTS
// ===============================
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables FIRST
dotenv.config();

// ===============================
// DATABASE CONNECTION
// ===============================
import connectDB from "./config/db.js";

// ===============================
// ROUTES
// ===============================
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// ===============================
// INITIAL SETUP
// ===============================
connectDB(); // Connect to MongoDB

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/reviews", reviewRoutes);

// ===============================
// API ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// ===============================
// EMAIL TEST ROUTE
// ===============================
app.get("/test-email", async (req, res) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return res.status(500).send("❌ EMAIL_USER or EMAIL_PASS not set in environment variables");
    }

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
        console.error(error);
        res.status(500).send("❌ Email failed");
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