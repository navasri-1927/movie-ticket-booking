import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function GuestInfoPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selected = [], totalPrice = 0 } = location.state || {};

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleContinue = () => {
        if (!email || !phone) {
            alert("Please enter email and phone");
            return;
        }

        navigate("/payment", {
            state: { selected, totalPrice, guest: { email, phone } }
        });
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2>Guest Details</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={styles.input}
                />
                <button style={styles.btn} onClick={handleContinue}>Continue to Payment</button>
            </div>
        </div>
    );
}

const styles = {
    page: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f5f5", fontFamily: "Poppins" },
    container: { background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", gap: "20px", width: "350px" },
    input: { padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" },
    btn: { padding: "15px", borderRadius: "10px", border: "none", background: "#f84464", color: "#fff", fontWeight: "700", cursor: "pointer" }
};