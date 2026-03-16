const User = require("../models/User");
const Movie = require("../models/Movie");
const Booking = require("../models/Booking");

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalMovies = await Movie.countDocuments();
        const totalBookings = await Booking.countDocuments();

        const revenueData = await Booking.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        res.json({
            totalUsers,
            totalMovies,
            totalBookings,
            totalRevenue
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRevenuePerMovie = async (req, res) => {
    try {
        const revenue = await Booking.aggregate([
            {
                $lookup: {
                    from: "shows",
                    localField: "show",
                    foreignField: "_id",
                    as: "showData"
                }
            },
            { $unwind: "$showData" },
            {
                $lookup: {
                    from: "movies",
                    localField: "showData.movie",
                    foreignField: "_id",
                    as: "movieData"
                }
            },
            { $unwind: "$movieData" },
            {
                $group: {
                    _id: "$movieData.title",
                    revenue: { $sum: "$totalAmount" }
                }
            }
        ]);

        res.json(revenue);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};