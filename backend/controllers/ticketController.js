const Booking = require("../models/Booking");
const PDFDocument = require("pdfkit");

exports.generateTicket = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId)
            .populate({
                path: "show",
                populate: ["movie", "theatre"]
            })
            .populate("user");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // 🔒 Ensure user owns booking
        if (booking.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const doc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=ticket-${booking._id}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(22).text("🎬 Movie Ticket", { align: "center" });
        doc.moveDown();

        doc.fontSize(14).text(`Booking ID: ${booking._id}`);
        doc.text(`Name: ${booking.user.name}`);
        doc.text(`Movie: ${booking.show.movie.title}`);
        doc.text(`Theatre: ${booking.show.theatre.name}`);
        doc.text(`Location: ${booking.show.theatre.location}`);
        doc.text(`Show Time: ${booking.show.showTime}`);
        doc.text(`Seats: ${booking.seats.join(", ")}`);
        doc.text(`Total Amount: ₹${booking.totalAmount}`);

        doc.end();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};