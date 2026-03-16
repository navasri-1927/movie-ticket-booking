import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AddShow() {

    const navigate = useNavigate();

    const [show, setShow] = useState({
        movie: "",
        screen: "",
        date: "",
        time: "",
        silverPrice: "",
        goldPrice: "",
        platinumPrice: ""
    });

    const handleChange = (e) => {
        setShow({ ...show, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const oldShows = JSON.parse(localStorage.getItem("shows")) || [];

        const updatedShows = [...oldShows, show];

        localStorage.setItem("shows", JSON.stringify(updatedShows));

        alert("Show Added Successfully 🎬");

        // redirect to dashboard
        navigate("/theater-dashboard");
    };

    return (
        <div style={styles.page}>

            <div style={styles.card}>

                <h1 style={styles.title}>🎬 Add New Show</h1>

                <form style={styles.form} onSubmit={handleSubmit}>

                    <input
                        name="movie"
                        placeholder="Movie Name"
                        value={show.movie}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <input
                        name="screen"
                        placeholder="Screen Number"
                        value={show.screen}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <input
                        type="date"
                        name="date"
                        value={show.date}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <input
                        type="time"
                        name="time"
                        value={show.time}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <h3 style={{ marginTop: "10px" }}>Seat Pricing</h3>

                    <input
                        name="silverPrice"
                        placeholder="Silver Seat Price"
                        value={show.silverPrice}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <input
                        name="goldPrice"
                        placeholder="Gold Seat Price"
                        value={show.goldPrice}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <input
                        name="platinumPrice"
                        placeholder="Platinum Seat Price"
                        value={show.platinumPrice}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <button style={styles.button}>
                        ➕ Add Show
                    </button>

                </form>

                {/* Manage Shows Button */}
                <Link to="/theater/shows">
                    <button style={styles.manageBtn}>
                        🎞 Manage Shows
                    </button>
                </Link>

            </div>

        </div>
    );
}

const styles = {

    page: {
        minHeight: "100vh",
        background: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI"
    },

    card: {
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        width: "420px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    },

    title: {
        textAlign: "center",
        color: "#c40000",
        marginBottom: "25px"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "14px"
    },

    button: {
        marginTop: "15px",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        background: "linear-gradient(90deg,#ff4b2b,#ff416c)",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "15px"
    },

    manageBtn: {
        marginTop: "15px",
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        background: "#333",
        color: "white",
        cursor: "pointer"
    }

};

export default AddShow;