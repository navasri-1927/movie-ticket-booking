import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMovie = ({ movies, setMovies }) => {
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [duration, setDuration] = useState("");
    const [genre, setGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [poster, setPoster] = useState("");

    const navigate = useNavigate();

    const handlePosterUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPoster(url);
        }
    };

    const handleAddMovie = (e) => {
        e.preventDefault();

        if (!title || !language || !duration || !genre || !releaseDate || !poster) {
            alert("Please fill all fields");
            return;
        }

        const newMovie = {
            id: Date.now(),
            title,
            language,
            duration,
            genre,
            releaseDate,
            poster,
            status: "Now Showing"
        };

        setMovies([...movies, newMovie]);

        alert("Movie Added Successfully 🎬");

        setTitle("");
        setLanguage("");
        setDuration("");
        setGenre("");
        setReleaseDate("");
        setPoster("");

        navigate("/admin-dashboard");
    };

    return (
        <div style={styles.container}>

            {/* HEADER */}
            <div style={styles.header}>
                <h2 style={styles.title}>🎬 Add Movie</h2>

                <button
                    style={styles.manageBtn}
                    onClick={() => navigate("/admin/movies")}
                >
                    Manage Movies
                </button>
            </div>

            <form onSubmit={handleAddMovie} style={styles.form}>
                <input type="text" placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
                <input type="text" placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.input} />
                <input type="text" placeholder="Duration (Ex: 2h 30m)" value={duration} onChange={(e) => setDuration(e.target.value)} style={styles.input} />
                <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} style={styles.input} />
                <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} style={styles.input} />
                <input type="file" onChange={handlePosterUpload} style={styles.input} />

                <button style={styles.button}>Add Movie</button>
            </form>

            {poster && (
                <div style={styles.previewBox}>
                    <h3>Poster Preview</h3>
                    <img src={poster} alt="preview" style={styles.preview} />
                </div>
            )}

            <h2 style={{ marginTop: "40px" }}>🎥 Movie List</h2>

            {movies.length === 0 && (
                <p style={styles.empty}>No movies added yet</p>
            )}

            <div style={styles.movieGrid}>
                {movies.map((movie) => (
                    <div key={movie.id} style={styles.card}>
                        <img src={movie.poster} alt={movie.title} style={styles.poster} />
                        <h3>{movie.title}</h3>
                        <p>{movie.language}</p>
                        <p>{movie.duration}</p>
                        <p>{movie.genre}</p>
                        <p>{movie.releaseDate}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AddMovie;

const styles = {

    container: { padding: "30px", background: "#f4f4f4", minHeight: "100vh" },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    },

    title: { color: "#b30000" },

    manageBtn: {
        background: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
    },

    form: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "15px",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },

    input: { padding: "10px", border: "1px solid #ddd", borderRadius: "6px" },

    button: {
        background: "#b30000",
        color: "#fff",
        border: "none",
        padding: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        gridColumn: "span 3",
        fontWeight: "bold"
    },

    previewBox: { marginTop: "25px", textAlign: "center" },

    preview: { width: "200px", borderRadius: "8px", marginTop: "10px" },

    empty: { color: "gray", marginTop: "20px" },

    movieGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginTop: "20px"
    },

    card: {
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        transition: "0.3s"
    },

    poster: {
        width: "100%",
        height: "250px",
        objectFit: "cover",
        borderRadius: "6px"
    }

};