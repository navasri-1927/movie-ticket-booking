import { Link } from "react-router-dom";

function TheaterDashboard() {
    return (
        <div style={styles.container}>

            {/* Sidebar */}
            <div style={styles.sidebar}>

                <h2 style={styles.logo}>🎬 Theater Panel</h2>

                <nav style={styles.nav}>

                    <Link to="/theater-dashboard" style={styles.link}>
                        📊 Dashboard
                    </Link>

                    <Link to="/theater/add-show" style={styles.link}>
                        ➕ Add Show
                    </Link>

                    <Link to="/theater/shows" style={styles.link}>
                        🎞 Manage Shows
                    </Link>

                    <Link to="/" style={styles.link}>
                        🚪 Logout
                    </Link>

                </nav>

            </div>


            {/* Main Content */}
            <div style={styles.main}>

                {/* Top Bar */}
                <div style={styles.topbar}>
                    <h1 style={styles.title}>Theater Owner Dashboard</h1>
                    <div style={styles.owner}>👤 Theater Owner</div>
                </div>


                {/* Stats */}
                <div style={styles.stats}>

                    <div style={styles.card}>
                        <h3>Total Shows</h3>
                        <p style={styles.number}>12</p>
                    </div>

                    <div style={styles.card}>
                        <h3>Total Bookings</h3>
                        <p style={styles.number}>356</p>
                    </div>

                    <div style={styles.card}>
                        <h3>Today's Revenue</h3>
                        <p style={styles.number}>₹24,500</p>
                    </div>

                    <div style={styles.card}>
                        <h3>Available Screens</h3>
                        <p style={styles.number}>4</p>
                    </div>

                </div>


                {/* Quick Actions */}
                <div style={styles.actions}>

                    <h2 style={{ marginBottom: "20px" }}>Quick Actions</h2>

                    <div style={styles.actionBtns}>

                        <Link to="/theater/add-show">
                            <button style={styles.btn}>
                                ➕ Add New Show
                            </button>
                        </Link>

                        <Link to="/theater/shows">
                            <button style={styles.btn}>
                                🎞 Manage Shows
                            </button>
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

const styles = {

    container: {
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Segoe UI"
    },

    sidebar: {
        width: "250px",
        background: "linear-gradient(180deg,#b30000,#7a0000)",
        color: "white",
        padding: "30px 20px"
    },

    logo: {
        marginBottom: "40px"
    },

    nav: {
        display: "flex",
        flexDirection: "column",
        gap: "18px"
    },

    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "16px",
        padding: "10px",
        borderRadius: "8px",
        transition: "0.2s"
    },

    main: {
        flex: 1,
        background: "#f4f6f9",
        padding: "30px"
    },

    topbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
    },

    title: {
        color: "#b30000"
    },

    owner: {
        background: "white",
        padding: "8px 15px",
        borderRadius: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },

    stats: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "40px"
    },

    card: {
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        transition: "0.3s"
    },

    number: {
        fontSize: "30px",
        fontWeight: "bold",
        color: "#b30000",
        marginTop: "10px"
    },

    actions: {
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
    },

    actionBtns: {
        display: "flex",
        gap: "20px"
    },

    btn: {
        background: "linear-gradient(90deg,#ff4b2b,#ff416c)",
        color: "white",
        border: "none",
        padding: "12px 22px",
        borderRadius: "8px",
        fontSize: "15px",
        cursor: "pointer",
        boxShadow: "0 6px 15px rgba(0,0,0,0.15)"
    }

};

export default TheaterDashboard;