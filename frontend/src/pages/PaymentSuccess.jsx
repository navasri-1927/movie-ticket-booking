import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selected, totalPrice, email, phone } = location.state || {};

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={{ color: "#4BB543" }}>Payment Successful ✅</h2>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Seats:</strong> {selected.map(s => s.id).join(", ")}</p>
                <p><strong>Total Paid:</strong> ₹{totalPrice}</p>
                <button style={styles.btn} onClick={() => navigate("/")}>Back to Home</button>
            </div>
        </div>
    );
}

const styles = {
    page: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" },
    card: { background: "#fff", padding: "30px", borderRadius: "16px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" },
    btn: { marginTop: "20px", padding: "10px 20px", borderRadius: "8px", border: "none", background: "#f84464", color: "#fff", cursor: "pointer" }
};