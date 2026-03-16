// backend/controllers/bookingController.js
const Booking = require("../models/Booking");
const Show = require("../models/Show");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Create a booking
const createBooking = async (req, res) => {
    try {
        const { showId, seats } = req.body;

        // Find show
        const show = await Show.findById(showId);
        if (!show) return res.status(404).json({ message: "Show not found" });

        // Check seat availability
        const unavailableSeats = seats.filter(
            (seat) => show.seats.find((s) => s.seatNumber === seat && s.isBooked)
        );
        if (unavailableSeats.length > 0) {
            return res.status(400).json({
                message: `Seats ${unavailableSeats.join(", ")} are already booked`,
            });
        }

        // Mark seats as booked
        show.seats.forEach((s) => {
            if (seats.includes(s.seatNumber)) s.isBooked = true;
        });
        await show.save();

        // Create booking
        const booking = await Booking.create({
            user: req.user.id,
            show: showId,
            seats,
            totalAmount: seats.length * show.price,
            paymentStatus: "pending",
        });

        // ==============================
        // AUTO EMAIL AFTER BOOKING
        // ==============================

        const user = await User.findById(req.user.id);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Movie Ticket Booking Confirmation 🎬",
            text: `
Hello ${user.name},

Your booking has been confirmed.

Movie: ${show.movie}
Seats: ${seats.join(", ")}
Total Amount: ₹${seats.length * show.price}

Enjoy your movie 🍿

Thank you for booking with us!
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ booking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get user bookings
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate("show")
            .populate("user", "name email");

        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createBooking, getMyBookings };