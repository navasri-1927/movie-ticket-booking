const Review = require("../models/Review");

exports.addReview = async (req, res) => {

    try {

        const review = new Review(req.body);

        await review.save();

        res.json({ message: "Review Added" });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};