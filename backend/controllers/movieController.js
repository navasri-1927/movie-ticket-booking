const axios = require("axios");

// ===============================
// GET NOW PLAYING MOVIES (TMDB)
// ===============================
exports.getNowPlayingMovies = async (req, res) => {
    try {
        const page = req.query.page || 1;

        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing`,
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    page: page,
                },
            }
        );

        res.json({
            movies: response.data.results,
            totalPages: response.data.total_pages,
        });
    } catch (error) {
        console.error("TMDB Error:", error.message);
        res.status(500).json({ message: "Failed to fetch movies" });
    }
};

// ===============================
// GET MOVIE DETAILS
// ===============================
exports.getMovieDetails = async (req, res) => {
    try {
        const movieId = req.params.id;

        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}`,
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("TMDB Error:", error.message);
        res.status(500).json({ message: "Failed to fetch movie details" });
    }
};