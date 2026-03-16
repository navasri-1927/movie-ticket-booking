import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        alert("Admin Logged Out");
        navigate("/");
    };

    return (

        <div style={styles.container}>

            {/* Sidebar */}

            <div style={styles.sidebar}>

                <h2 style={styles.logo}>⚙ Admin Panel</h2>

                <ul style={styles.menu}>

                    <li
                        style={styles.menuItem}
                        onClick={() => navigate("/")}
                    >
                        Home
                    </li>

                    <li
                        style={styles.menuItem}
                        onClick={() => navigate("/admin-dashboard")}
                    >
                        Dashboard
                    </li>

                    <li
                        style={styles.menuItem}
                        onClick={() => navigate("/admin/add-movie")}
                    >
                        Add Movie
                    </li>

                    <li
                        style={styles.menuItem}
                        onClick={() => navigate("/admin/movies")}
                    >
                        Manage Movies
                    </li>

                    <div
                        style={styles.menuItem}
                        onClick={() => navigate("/admin/theaters")}
                    >
                        Manage Theaters
                    </div>

                    <li
                        style={styles.menuItem}
                        onClick={handleLogout}
                    >
                        Logout
                    </li>

                </ul>

            </div>


            {/* Main Content */}

            <div style={styles.main}>

                <h1 style={styles.title}>Admin Dashboard</h1>


                {/* Dashboard Cards */}

                <div style={styles.cardContainer}>

                    <div style={styles.card}>
                        <h3>Total Movies</h3>
                        <p style={styles.number}>45</p>
                    </div>

                    <div style={styles.card}>
                        <h3>Total Theaters</h3>
                        <p style={styles.number}>18</p>
                    </div>

                    <div style={styles.card}>
                        <h3>Total Users</h3>
                        <p style={styles.number}>1,240</p>
                    </div>

                    <div style={styles.card}>
                        <h3>Total Bookings</h3>
                        <p style={styles.number}>3,850</p>
                    </div>

                </div>


                {/* Recent Activity */}

                <div style={styles.activitySection}>

                    <h2>Recent Booking Activity</h2>

                    <table style={styles.table}>

                        <thead>

                            <tr>
                                <th style={styles.th}>User</th>
                                <th style={styles.th}>Movie</th>
                                <th style={styles.th}>Seats</th>
                                <th style={styles.th}>Amount</th>
                                <th style={styles.th}>Status</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>
                                <td style={styles.td}>Rahul</td>
                                <td style={styles.td}>Leo</td>
                                <td style={styles.td}>A3, A4</td>
                                <td style={styles.td}>₹400</td>
                                <td style={styles.success}>Confirmed</td>
                            </tr>

                            <tr>
                                <td style={styles.td}>Priya</td>
                                <td style={styles.td}>Jailer</td>
                                <td style={styles.td}>B2</td>
                                <td style={styles.td}>₹200</td>
                                <td style={styles.success}>Confirmed</td>
                            </tr>

                            <tr>
                                <td style={styles.td}>Arun</td>
                                <td style={styles.td}>Vikram</td>
                                <td style={styles.td}>C5, C6</td>
                                <td style={styles.td}>₹500</td>
                                <td style={styles.pending}>Pending</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
};

export default AdminDashboard;



const styles = {

    container: {
        display: "flex",
        height: "100vh",
        background: "#f4f4f4"
    },

    sidebar: {
        width: "230px",
        background: "#b30000",
        color: "#fff",
        padding: "20px"
    },

    logo: {
        marginBottom: "30px"
    },

    menu: {
        listStyle: "none",
        padding: 0
    },

    menuItem: {
        padding: "12px",
        cursor: "pointer",
        borderRadius: "5px",
        marginBottom: "10px"
    },

    main: {
        flex: 1,
        padding: "30px"
    },

    title: {
        color: "#b30000",
        marginBottom: "25px"
    },

    cardContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginBottom: "40px"
    },

    card: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center"
    },

    number: {
        fontSize: "28px",
        color: "#b30000",
        fontWeight: "bold"
    },

    activitySection: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "15px"
    },

    th: {
        borderBottom: "2px solid #ddd",
        padding: "10px",
        textAlign: "left"
    },

    td: {
        borderBottom: "1px solid #ddd",
        padding: "10px"
    },

    success: {
        color: "green",
        fontWeight: "bold"
    },

    pending: {
        color: "orange",
        fontWeight: "bold"
    }

};