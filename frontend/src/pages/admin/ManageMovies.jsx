import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageMovies = ({ movies, setMovies, adminLoggedIn }) => {

    const [search, setSearch] = useState("");
    const [editingMovie, setEditingMovie] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        language: "",
        duration: "",
        status: "",
        poster: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!adminLoggedIn) {
            navigate("/admin-login");
        }
    }, [adminLoggedIn, navigate]);

    const deleteMovie = (id) => {
        const confirmDelete = window.confirm("Delete this movie?");
        if (confirmDelete) {
            setMovies(movies.filter((movie) => movie.id !== id));
        }
    };

    // OPEN EDIT MODAL
    const openEdit = (movie) => {
        setEditingMovie(movie);

        setFormData({
            title: movie.title,
            language: movie.language,
            duration: movie.duration,
            status: movie.status,
            poster: movie.poster
        });
    };

    // INPUT CHANGE
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // POSTER UPLOAD
    const handlePosterUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);

            setFormData({
                ...formData,
                poster: url
            });
        }
    };

    // SAVE EDIT
    const saveEdit = () => {

        const updatedMovies = movies.map((m) =>
            m.id === editingMovie.id
                ? { ...m, ...formData }
                : m
        );

        setMovies(updatedMovies);
        setEditingMovie(null);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={styles.container}>

            <h2 style={styles.title}> Manage Movies</h2>

            <input
                type="text"
                placeholder="Search Movie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.search}
            />

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Poster</th>
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Language</th>
                        <th style={styles.th}>Duration</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredMovies.map((movie) => (
                        <tr key={movie.id}>

                            <td style={styles.td}>
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    style={styles.poster}
                                />
                            </td>

                            <td style={styles.td}>{movie.title}</td>
                            <td style={styles.td}>{movie.language}</td>
                            <td style={styles.td}>{movie.duration}</td>

                            <td style={styles.td}>
                                <span
                                    style={
                                        movie.status === "Now Showing"
                                            ? styles.active
                                            : styles.upcoming
                                    }
                                >
                                    {movie.status}
                                </span>
                            </td>

                            <td style={styles.td}>

                                <button
                                    style={styles.editBtn}
                                    onClick={() => openEdit(movie)}
                                >
                                    Edit
                                </button>

                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => deleteMovie(movie.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* EDIT MODAL */}

            {editingMovie && (

                <div style={styles.overlay}>

                    <div style={styles.modal}>

                        <h2 style={styles.modalTitle}>Edit Movie</h2>

                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Movie Title"
                            style={styles.input}
                        />

                        <input
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            placeholder="Language"
                            style={styles.input}
                        />

                        <input
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="Duration"
                            style={styles.input}
                        />

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            style={styles.input}
                        >
                            <option>Now Showing</option>
                            <option>Upcoming</option>
                        </select>

                        <input
                            type="file"
                            onChange={handlePosterUpload}
                            style={styles.input}
                        />

                        {formData.poster && (
                            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                                <img
                                    src={formData.poster}
                                    alt="preview"
                                    style={styles.preview}
                                />
                            </div>
                        )}

                        <div style={styles.modalButtons}>

                            <button
                                style={styles.saveBtn}
                                onClick={saveEdit}
                            >
                                Save
                            </button>

                            <button
                                style={styles.cancelBtn}
                                onClick={() => setEditingMovie(null)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default ManageMovies;

const styles = {

    container: { padding: "30px" },

    title: { color: "#b30000", marginBottom: "20px" },

    search: {
        padding: "10px",
        width: "300px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginBottom: "20px"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },

    th: {
        padding: "12px",
        borderBottom: "2px solid #ddd",
        textAlign: "left"
    },

    td: {
        padding: "10px",
        borderBottom: "1px solid #eee"
    },

    poster: {
        width: "60px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "5px"
    },

    preview: {
        width: "120px",
        borderRadius: "8px"
    },

    editBtn: {
        background: "#007bff",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        marginRight: "8px",
        borderRadius: "4px",
        cursor: "pointer"
    },

    deleteBtn: {
        background: "red",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        borderRadius: "4px",
        cursor: "pointer"
    },

    active: { color: "green", fontWeight: "bold" },

    upcoming: { color: "orange", fontWeight: "bold" },

    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    modal: {
        background: "#fff",
        padding: "30px",
        width: "420px",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    },

    modalTitle: {
        marginBottom: "20px",
        color: "#b30000"
    },

    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "12px",
        border: "1px solid #ddd",
        borderRadius: "6px"
    },

    modalButtons: {
        display: "flex",
        justifyContent: "space-between"
    },

    saveBtn: {
        background: "#28a745",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "6px",
        cursor: "pointer"
    },

    cancelBtn: {
        background: "#999",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "6px",
        cursor: "pointer"
    }

};