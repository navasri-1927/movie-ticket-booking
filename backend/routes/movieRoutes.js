const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

const {
    getNowPlayingMovies,
    getMovieDetails,
} = require("../controllers/movieController");


// 🎬 Now Playing Movies
router.get("/now-playing", getNowPlayingMovies);


// 🔎 Search Movies
router.get("/search", async (req, res) => {
    try {

        const query = req.query.query;

        // ✅ FIX: prevent empty search
        if (!query || query.trim() === "") {
            return res.json({ movies: [] });
        }

        const movies = await Movie.find({
            title: { $regex: query, $options: "i" }
        });

        res.json({ movies });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// 🎬 Single Movie Details
router.get("/:id", getMovieDetails);


module.exports = router;