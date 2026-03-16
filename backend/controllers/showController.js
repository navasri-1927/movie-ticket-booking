const Show = require("../models/Show");

exports.createShow = async (req, res) => {
    try {
        const show = await Show.create(req.body);
        res.status(201).json(show);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getShows = async (req, res) => {
    try {
        const shows = await Show.find()
            .populate("movie")
            .populate("theatre");

        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};