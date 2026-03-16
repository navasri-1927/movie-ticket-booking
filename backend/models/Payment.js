const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        paymentId: {
            type: String
        },
        orderId: {
            type: String
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);