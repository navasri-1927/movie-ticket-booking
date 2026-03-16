import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * MovieCard - Clean movie tile
 * props:
 *  - movie: full movie object
 *  - img: poster URL (optional)
 */
const MovieCard = ({ movie, img }) => {

    const navigate = useNavigate();

    const poster =
        img || (movie.poster_path
            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
            : "");

    const rating = movie.vote_average ?? movie.rating ?? 0;

    const short = (movie.overview || movie.description || "").trim();
    const words = short.split(" ").slice(0, 8).join(" ");
    const oneLine = words + "...";

    return (

        <div style={styles.card}>

            {/* Poster */}

            <div
                style={styles.posterWrap}
                onClick={() =>
                    navigate(`/movie/${movie.id}`, {
                        state: { movieName: movie.title }
                    })
                }
            >

                <img
                    src={poster || "/placeholder_poster.png"}
                    alt={movie.title}
                    style={styles.poster}
                />

            </div>

            <div style={styles.info}>

                {/* Title */}

                <h3
                    style={styles.title}
                    onClick={() =>
                        navigate(`/movie/${movie.id}`, {
                            state: { movieName: movie.title }
                        })
                    }
                >
                    {movie.title}
                </h3>

                {/* Rating + Genre */}

                <div style={styles.metaRow}>

                    <div style={styles.rating}>
                        ★ {Number(rating).toFixed(1)}
                    </div>

                    <div style={styles.genre}>
                        {(movie.genres &&
                            movie.genres
                                .slice(0, 2)
                                .map((g) => g.name)
                                .join(" / ")) ||
                            movie.genre ||
                            ""}
                    </div>

                </div>

                {/* Short Description */}

                <div style={styles.desc}>
                    {oneLine}
                </div>

            </div>

        </div>

    );

};

const styles = {

    card: {
        width: 220,
        background: "#fff",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        margin: 12,
    },

    posterWrap: {
        cursor: "pointer",
        height: 330,
        overflow: "hidden",
        background: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    poster: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },

    info: {
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },

    title: {
        fontSize: 16,
        margin: 0,
        color: "#111",
        cursor: "pointer",
    },

    metaRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 13,
        color: "#666",
    },

    rating: {
        background: "#111",
        color: "#fff",
        padding: "4px 8px",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: "700",
    },

    genre: {
        fontSize: 13,
    },

    desc: {
        fontSize: 13,
        color: "#555",
        minHeight: 30,
    },

};

export default MovieCard;