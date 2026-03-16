import { useEffect, useState } from "react";

function ManageShows() {

    const [shows, setShows] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editShow, setEditShow] = useState({});

    useEffect(() => {
        const savedShows = JSON.parse(localStorage.getItem("shows")) || [];
        setShows(savedShows);
    }, []);

    const deleteShow = (index) => {

        const updated = shows.filter((_, i) => i !== index);

        setShows(updated);

        localStorage.setItem("shows", JSON.stringify(updated));
    };

    const openEdit = (index) => {
        setEditIndex(index);
        setEditShow(shows[index]);
    };

    const handleChange = (e) => {
        setEditShow({ ...editShow, [e.target.name]: e.target.value });
    };

    const saveEdit = () => {

        const updatedShows = [...shows];

        updatedShows[editIndex] = editShow;

        setShows(updatedShows);

        localStorage.setItem("shows", JSON.stringify(updatedShows));

        setEditIndex(null);

        alert("Show Updated Successfully 🎬");
    };

    return (
        <div style={styles.page}>

            <h1 style={styles.title}>🎬 Manage Shows</h1>

            <div style={styles.tableBox}>

                <table style={styles.table}>

                    <thead>
                        <tr style={styles.headRow}>
                            <th>Movie</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Silver</th>
                            <th>Gold</th>
                            <th>Platinum</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {shows.map((show, index) => (

                            <tr key={index} style={styles.row}>

                                <td>{show.movie}</td>
                                <td>{show.date}</td>
                                <td>{show.time}</td>
                                <td>{show.duration}</td>
                                <td>₹{show.silverPrice}</td>
                                <td>₹{show.goldPrice}</td>
                                <td>₹{show.platinumPrice}</td>

                                <td>

                                    <button
                                        style={styles.editBtn}
                                        onClick={() => openEdit(index)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        style={styles.deleteBtn}
                                        onClick={() => deleteShow(index)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>


            {/* EDIT POPUP */}

            {editIndex !== null && (

                <div style={styles.overlay}>

                    <div style={styles.modal}>

                        <h2>Edit Show</h2>

                        <input
                            name="movie"
                            placeholder="Movie Name"
                            value={editShow.movie}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            type="date"
                            name="date"
                            value={editShow.date}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            name="time"
                            placeholder="Time"
                            value={editShow.time}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            name="duration"
                            placeholder="Duration (Eg: 2h 30m)"
                            value={editShow.duration}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            name="silverPrice"
                            placeholder="Silver Price"
                            value={editShow.silverPrice}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            name="goldPrice"
                            placeholder="Gold Price"
                            value={editShow.goldPrice}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            name="platinumPrice"
                            placeholder="Platinum Price"
                            value={editShow.platinumPrice}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <div style={styles.modalBtns}>

                            <button style={styles.saveBtn} onClick={saveEdit}>
                                Save
                            </button>

                            <button
                                style={styles.cancelBtn}
                                onClick={() => setEditIndex(null)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

const styles = {

    page: {
        padding: "40px",
        background: "#f4f4f4",
        minHeight: "100vh",
        fontFamily: "Segoe UI"
    },

    title: {
        color: "#c40000",
        marginBottom: "20px"
    },

    tableBox: {
        background: "white",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse"
    },

    headRow: {
        background: "#c40000",
        color: "white"
    },

    row: {
        borderBottom: "1px solid #eee",
        textAlign: "center"
    },

    editBtn: {
        background: "#007bff",
        color: "white",
        border: "none",
        padding: "6px 10px",
        borderRadius: "5px",
        marginRight: "5px",
        cursor: "pointer"
    },

    deleteBtn: {
        background: "#c40000",
        color: "white",
        border: "none",
        padding: "6px 10px",
        borderRadius: "5px",
        cursor: "pointer"
    },

    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    modal: {
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },

    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px"
    },

    modalBtns: {
        display: "flex",
        gap: "10px"
    },

    saveBtn: {
        flex: 1,
        background: "#c40000",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "6px",
        cursor: "pointer"
    },

    cancelBtn: {
        flex: 1,
        background: "#555",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "6px",
        cursor: "pointer"
    }

};

export default ManageShows;