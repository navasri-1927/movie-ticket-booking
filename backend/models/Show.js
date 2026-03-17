const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: true
        },
        theatre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Theatre",
            required: true
        },
        showTime: {
            type: Date,
            required: true
        },
        ticketPrice: {
            type: Number,
            required: true
        },
        bookedSeats: {
            type: [Number],
            default: []
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("shows", showSchema);