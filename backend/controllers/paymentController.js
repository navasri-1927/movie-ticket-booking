const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

// Create Payment Order (Mock Structure)
exports.createPaymentOrder = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const payment = await Payment.create({
            booking: bookingId,
            user: req.user._id,
            amount: booking.totalAmount,
            orderId: "ORDER_" + Date.now(),
            status: "pending"
        });

        res.status(201).json({
            message: "Payment order created",
            payment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify Payment (Mock Success)
exports.verifyPayment = async (req, res) => {
    try {
        const { paymentId } = req.body;

        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        payment.status = "success";
        payment.paymentId = "PAY_" + Date.now();

        await payment.save();

        res.json({
            message: "Payment successful",
            payment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};