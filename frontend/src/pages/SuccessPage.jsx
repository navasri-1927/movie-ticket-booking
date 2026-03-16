import { useNavigate, useLocation } from "react-router-dom";

function SuccessPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const { selected, totalPrice } = location.state || {};

    const goHome = () => {
        navigate("/");
    };

    return (
        <div style={styles.container}>

            <div style={styles.card}>

                <h1 style={styles.icon}>🎉</h1>

                <h2 style={styles.title}>
                    Booking Successful!
                </h2>

                <p style={styles.text}>
                    Your movie tickets have been booked successfully.
                </p>

                <p style={styles.text}>
                    Seats Booked: <b>{selected?.length || 0}</b>
                </p>

                <p style={styles.text}>
                    Total Paid: <b>₹{totalPrice || 0}</b>
                </p>

                <button onClick={goHome} style={styles.button}>
                    Go To Home
                </button>

            </div>

        </div>
    );
}

const styles = {

    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5"
    },

    card: {
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
    },

    icon: {
        fontSize: "60px",
        marginBottom: "10px"
    },

    title: {
        marginBottom: "10px"
    },

    text: {
        margin: "5px 0"
    },

    button: {
        marginTop: "20px",
        padding: "12px 25px",
        border: "none",
        background: "red",
        color: "white",
        borderRadius: "6px",
        cursor: "pointer"
    }

};

export default SuccessPage;