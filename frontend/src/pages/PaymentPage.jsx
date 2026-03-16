import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { selected = [], totalPrice = 0, guest = {} } = location.state || {};

    const [paymentType, setPaymentType] = useState("card");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const handlePayment = () => {
        if (paymentType === "card" && (!cardNumber || !expiry || !cvv)) {
            alert("Enter valid card details");
            return;
        }

        alert(`Payment successful! 🎉\nTotal: ₹${totalPrice}`);

        navigate("/success", {
            state: { selected, totalPrice }
        });
    };

    return (
        <div style={styles.page}>

            <div style={styles.container}>

                {/* LEFT PAYMENT AREA */}

                <div style={styles.paymentCard}>

                    <h2 style={styles.header}>Secure Payment</h2>

                    <div style={styles.paymentTypes}>

                        <div
                            style={{
                                ...styles.paymentOption,
                                border: paymentType === "card" ? "2px solid #f84464" : "1px solid #ddd"
                            }}
                            onClick={() => setPaymentType("card")}
                        >
                            💳 Card
                        </div>

                        <div
                            style={{
                                ...styles.paymentOption,
                                border: paymentType === "upi" ? "2px solid #f84464" : "1px solid #ddd"
                            }}
                            onClick={() => setPaymentType("upi")}
                        >
                            📱 UPI
                        </div>

                        <div
                            style={{
                                ...styles.paymentOption,
                                border: paymentType === "paypal" ? "2px solid #f84464" : "1px solid #ddd"
                            }}
                            onClick={() => setPaymentType("paypal")}
                        >
                            🌐 PayPal
                        </div>

                    </div>

                    {paymentType === "card" && (
                        <div style={styles.cardForm}>

                            <input
                                type="text"
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={e => setCardNumber(e.target.value)}
                                style={styles.input}
                            />

                            <div style={styles.row}>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={expiry}
                                    onChange={e => setExpiry(e.target.value)}
                                    style={styles.input}
                                />

                                <input
                                    type="password"
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={e => setCvv(e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                        </div>
                    )}

                    {paymentType === "upi" && (
                        <div style={styles.cardForm}>
                            <input
                                type="text"
                                placeholder="Enter UPI ID (example@upi)"
                                style={styles.input}
                            />
                        </div>
                    )}

                    {paymentType === "paypal" && (
                        <div style={styles.cardForm}>
                            <p style={{ color: "#666" }}>You will be redirected to PayPal</p>
                        </div>
                    )}

                    <button style={styles.payBtn} onClick={handlePayment}>
                        Pay ₹{totalPrice}
                    </button>

                </div>

                {/* RIGHT BOOKING SUMMARY */}

                <div style={styles.summaryCard}>

                    <h3 style={{ marginBottom: 15 }}>Booking Summary</h3>

                    <div style={styles.summarySection}>

                        <p style={styles.label}>Seats</p>

                        <div style={styles.seatList}>
                            {selected.map(seat => (
                                <span key={seat.id} style={styles.seatTag}>
                                    {seat.id}
                                </span>
                            ))}
                        </div>

                    </div>

                    <div style={styles.summarySection}>
                        <p style={styles.label}>Total Price</p>
                        <h2 style={{ color: "#f84464" }}>₹{totalPrice}</h2>
                    </div>

                    {guest.email && (
                        <div style={styles.summarySection}>
                            <p style={styles.label}>Email</p>
                            <p>{guest.email}</p>
                        </div>
                    )}

                    {guest.phone && (
                        <div style={styles.summarySection}>
                            <p style={styles.label}>Phone</p>
                            <p>{guest.phone}</p>
                        </div>
                    )}

                </div>

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
        padding: "20px",
        fontFamily: "sans-serif"
    },
    container: {
        width: "100%",
        maxWidth: "1100px",
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "30px",
        alignItems: "center"
    },

    paymentCard: {
        background: "#fff",
        padding: "30px",
        borderRadius: "14px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
    },

    summaryCard: {
        background: "#fff",
        padding: "25px",
        borderRadius: "14px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        height: "fit-content"
    },

    header: {
        marginBottom: "25px"
    },

    paymentTypes: {
        display: "flex",
        gap: "10px",
        marginBottom: "25px"
    },

    paymentOption: {
        flex: 1,
        padding: "12px",
        textAlign: "center",
        borderRadius: "8px",
        cursor: "pointer",
        background: "#fafafa",
        fontWeight: "600"
    },

    cardForm: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        marginBottom: "25px"
    },

    row: {
        display: "flex",
        gap: "10px"
    },

    input: {
        flex: 1,
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        outline: "none",
        fontSize: "14px"
    },

    payBtn: {
        width: "100%",
        padding: "14px",
        background: "linear-gradient(90deg,#f84464,#ff6a85)",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "700",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(248,68,100,0.4)"
    },

    summarySection: {
        marginBottom: "18px"
    },

    label: {
        fontSize: "13px",
        color: "#888"
    },

    seatList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "6px"
    },

    seatTag: {
        background: "#f84464",
        color: "#fff",
        padding: "4px 10px",
        borderRadius: "6px",
        fontSize: "12px"
    }

};