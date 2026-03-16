import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "418fa86a2c7f58ec4d60820d43d41ec5";

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [loading, setLoading] = useState(true);

    // ⭐ Review states
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    useEffect(() => {

        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then((res) => {
                setMovie(res.data);
            });

        axios
            .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
            .then((res) => {
                setCast(res.data.cast.slice(0, 10));
                setCrew(res.data.crew);
                setLoading(false);
            });

        fetchReviews();

    }, [id]);

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/reviews/${id}`);
            setReviews(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const submitReview = async () => {

        if (!rating || !reviewText) {
            alert("Please add rating and review");
            return;
        }

        await axios.post("http://localhost:5000/api/reviews", {
            movieId: id,
            user: "User",
            rating,
            review: reviewText
        });

        setReviewText("");
        setRating(0);

        fetchReviews();

        // ⭐ SIMPLE POPUP
        alert("Review submitted successfully!");

    };

    if (loading) {
        return (
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                Loading Movie...
            </h2>
        );
    }

    if (!movie) {
        return (
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                Movie Not Found
            </h2>
        );
    }

    const backdrop = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "https://via.placeholder.com/1200x400";

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : "https://via.placeholder.com/300x450";

    const getCrew = (job) => {
        const person = crew.find((c) => c.job === job);
        return person ? person.name : "Not available";
    };

    return (
        <div>

            {/* BACKDROP */}

            <div
                style={{
                    backgroundImage: `url(${backdrop})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "420px",
                    display: "flex",
                    alignItems: "center",
                    padding: "40px",
                    color: "white",
                    backgroundColor: "#000"
                }}
            >

                <img
                    src={poster}
                    alt={movie.title}
                    style={{
                        width: "230px",
                        borderRadius: "10px",
                        marginRight: "30px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
                    }}
                />

                <div>
                    <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
                        {movie.title}
                    </h1>

                    <p style={{ fontSize: "18px" }}>
                        ⭐ {movie.vote_average?.toFixed(1)} / 10
                    </p>

                    <p>📅 Release: {movie.release_date}</p>

                    <p>⏱ Runtime: {movie.runtime} minutes</p>

                    <button
                        onClick={() => navigate(`/book/${movie.id}`)}
                        style={{
                            marginTop: "20px",
                            padding: "12px 28px",
                            fontSize: "18px",
                            backgroundColor: "#f84464",
                            border: "none",
                            color: "white",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Book Tickets
                    </button>
                </div>

            </div>

            {/* MOVIE INFO */}

            <div
                style={{
                    padding: "40px",
                    maxWidth: "1200px",
                    margin: "auto"
                }}
            >

                <h2>About the Movie</h2>

                <p
                    style={{
                        fontSize: "18px",
                        lineHeight: "1.7",
                        marginTop: "10px"
                    }}
                >
                    {movie.overview || "No description available."}
                </p>

                <br />

                <h3>Genres</h3>
                <p>
                    {movie.genres && movie.genres.length > 0
                        ? movie.genres.map((g) => g.name).join(", ")
                        : "Not available"}
                </p>

                <br />

                <h3>Language</h3>
                <p>{movie.original_language?.toUpperCase()}</p>

                <br /><br />

                {/* REVIEW SECTION */}

                <h2>User Reviews</h2>

                <div style={{ marginTop: "20px" }}>

                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                            style={{
                                fontSize: "30px",
                                cursor: "pointer",
                                color: star <= rating ? "#f84464" : "#ccc"
                            }}
                        >
                            ★
                        </span>
                    ))}

                </div>

                <textarea
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    style={{
                        width: "100%",
                        marginTop: "15px",
                        padding: "10px"
                    }}
                />

                <button
                    onClick={submitReview}
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        background: "#f84464",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Submit Review
                </button>

                <br /><br />

                {reviews.map((r, index) => (
                    <div key={index} style={{ marginBottom: "15px" }}>
                        <h4>{r.user}</h4>
                        <p>{"★".repeat(r.rating)}</p>
                        <p>{r.review}</p>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default MovieDetails;