import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProcessingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selected = [], totalPrice = 0, email = "", phone = "", paymentMethod = "" } = location.state || {};
    const [status, setStatus] = useState("processing");

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus("success");
            setTimeout(() => {
                navigate("/"); // redirect to home
            }, 4000); // 4 sec after success
        }, 3000); // 3 sec fake processing
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Poppins" }}>
            {status === "processing" ? (
                <div>
                    <h2>Processing your payment...</h2>
                    <p>Method: {paymentMethod}</p>
                </div>
            ) : (
                <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", textAlign: "center" }}>
                    <h2 style={{ color: "#4BB543" }}>Payment Successful! 🎉</h2>
                    <p>Your ticket has been booked</p>
                    <p>Seats: {selected.map(s => s.id).join(", ")}</p>
                    <p>Total Paid: ₹{totalPrice}</p>
                    <p>Email: {email}</p>
                </div>
            )}
        </div>
    );
}