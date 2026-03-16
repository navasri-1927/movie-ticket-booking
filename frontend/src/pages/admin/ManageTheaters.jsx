import { useState } from "react";

const ManageTheaters = () => {

    const [search, setSearch] = useState("");

    const [theaters, setTheaters] = useState([
        {
            id: "TH001",
            name: "PVR Cinemas",
            city: "Chennai",
            screens: 6,
            owner: "Raj Kumar",
            contact: "9876543210",
            status: "Pending"
        },
        {
            id: "TH002",
            name: "INOX",
            city: "Bangalore",
            screens: 5,
            owner: "Karthik",
            contact: "9123456780",
            status: "Approved"
        },
        {
            id: "TH003",
            name: "AGS Cinemas",
            city: "Chennai",
            screens: 4,
            owner: "Mani",
            contact: "9998877665",
            status: "Pending"
        }
    ]);

    // APPROVE
    const approveTheater = (id) => {

        const updated = theaters.map((theater) =>
            theater.id === id
                ? { ...theater, status: "Approved" }
                : theater
        );

        setTheaters(updated);
    };

    // REJECT
    const rejectTheater = (id) => {

        const updated = theaters.map((theater) =>
            theater.id === id
                ? { ...theater, status: "Rejected" }
                : theater
        );

        setTheaters(updated);
    };

    // DISABLE
    const disableTheater = (id) => {

        const updated = theaters.map((theater) =>
            theater.id === id
                ? { ...theater, status: "Disabled" }
                : theater
        );

        setTheaters(updated);
    };

    const filtered = theaters.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div style={styles.container}>

            <h2 style={styles.title}>🎬 Manage Theaters</h2>

            <input
                type="text"
                placeholder="Search Theater..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.search}
            />

            <table style={styles.table}>

                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Theater Name</th>
                        <th style={styles.th}>City</th>
                        <th style={styles.th}>Screens</th>
                        <th style={styles.th}>Owner</th>
                        <th style={styles.th}>Contact</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {filtered.map((theater) => (

                        <tr key={theater.id}>

                            <td style={styles.td}>{theater.id}</td>
                            <td style={styles.td}>{theater.name}</td>
                            <td style={styles.td}>{theater.city}</td>
                            <td style={styles.td}>{theater.screens}</td>
                            <td style={styles.td}>{theater.owner}</td>
                            <td style={styles.td}>{theater.contact}</td>

                            <td style={styles.td}>
                                <span
                                    style={
                                        theater.status === "Approved"
                                            ? styles.approved
                                            : theater.status === "Pending"
                                                ? styles.pending
                                                : theater.status === "Rejected"
                                                    ? styles.rejected
                                                    : styles.disabled
                                    }
                                >
                                    {theater.status}
                                </span>
                            </td>

                            <td style={styles.td}>

                                {theater.status === "Pending" && (
                                    <>
                                        <button
                                            style={styles.approveBtn}
                                            onClick={() => approveTheater(theater.id)}
                                        >
                                            Approve
                                        </button>

                                        <button
                                            style={styles.rejectBtn}
                                            onClick={() => rejectTheater(theater.id)}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}

                                {theater.status === "Approved" && (
                                    <button
                                        style={styles.disableBtn}
                                        onClick={() => disableTheater(theater.id)}
                                    >
                                        Disable
                                    </button>
                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
};

export default ManageTheaters;



const styles = {

    container: {
        padding: "30px",
        background: "#f4f4f4",
        minHeight: "100vh"
    },

    title: {
        color: "#b30000",
        marginBottom: "20px"
    },

    search: {
        padding: "10px",
        width: "300px",
        borderRadius: "6px",
        border: "1px solid #ddd",
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

    approved: {
        color: "green",
        fontWeight: "bold"
    },

    pending: {
        color: "orange",
        fontWeight: "bold"
    },

    rejected: {
        color: "red",
        fontWeight: "bold"
    },

    disabled: {
        color: "gray",
        fontWeight: "bold"
    },

    approveBtn: {
        background: "green",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        borderRadius: "4px",
        marginRight: "6px",
        cursor: "pointer"
    },

    rejectBtn: {
        background: "red",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        borderRadius: "4px",
        cursor: "pointer"
    },

    disableBtn: {
        background: "orange",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        borderRadius: "4px",
        cursor: "pointer"
    }

};