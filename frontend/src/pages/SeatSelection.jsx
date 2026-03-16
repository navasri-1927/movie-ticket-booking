import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const generateSeats = (rows = 9, cols = 14) => {
    const seats = [];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let r = 0; r < rows; r++) {
        const row = [];

        for (let c = 1; c <= cols; c++) {

            let type = "silver";

            if (r < 2) type = "vip";
            else if (r < 4) type = "platinum";
            else if (r < 6) type = "gold";

            row.push({
                id: `${letters[r]}${c}`,
                type,
                status: Math.random() > 0.85 ? "booked" : "available",
            });
        }

        seats.push(row);
    }

    return seats;
};

export default function SeatSelection() {

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const movieName = location.state?.movieName || "Movie";
    const theaterName = location.state?.theaterName || "Theater";
    const time = location.state?.time || "Showtime";

    const [seats, setSeats] = useState(generateSeats());
    const [selected, setSelected] = useState([]);

    const [showTerms, setShowTerms] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const priceMap = {
        vip: 400,
        platinum: 300,
        gold: 220,
        silver: 150,
    };

    const colors = {
        vip: "#ff4d4f",
        platinum: "#a56eff",
        gold: "#f5a623",
        silver: "#1ea83c",
    };

    const toggleSeat = (rowIndex, seatIndex) => {

        const seat = seats[rowIndex][seatIndex];
        if (seat.status === "booked") return;

        const updated = [...seats];

        if (seat.status === "selected") {

            updated[rowIndex][seatIndex].status = "available";

            setSelected((prev) =>
                prev.filter((s) => s.id !== seat.id)
            );

        } else {

            updated[rowIndex][seatIndex].status = "selected";

            setSelected((prev) => [...prev, seat]);
        }

        setSeats(updated);
    };

    const totalPrice = selected.reduce(
        (sum, seat) => sum + priceMap[seat.type],
        0
    );

    // UPDATED LOGIN CHECK
    const handleTermsContinue = () => {

        const token = localStorage.getItem("token");

        if (token) {

            const user = JSON.parse(localStorage.getItem("user"));

            navigate("/payment", {
                state: {
                    selected,
                    totalPrice,
                    guest: {
                        email: user?.email
                    }
                }
            });

        } else {

            // redirect to login first
            navigate("/login", {
                state: { selected, totalPrice }
            });

        }
    };

    const totalSeatsSelected = selected.length;

    return (

        <div style={styles.page}>

            <div style={styles.header}>
                <h2>{movieName}</h2>
                <p>{theaterName} • {time}</p>
            </div>

            <div style={styles.seatArea}>

                {seats.map((row, rowIndex) => {

                    const curveOffset = Math.abs(4 - rowIndex) * 8;

                    return (

                        <div
                            key={rowIndex}
                            style={{
                                ...styles.row,
                                marginLeft: curveOffset,
                                marginRight: curveOffset
                            }}
                        >

                            <span style={styles.rowLabel}>
                                {String.fromCharCode(65 + rowIndex)}
                            </span>

                            {row.map((seat, seatIndex) => {

                                const isVIP = seat.type === "vip";

                                return (

                                    <div
                                        key={seat.id}
                                        onClick={() =>
                                            toggleSeat(rowIndex, seatIndex)
                                        }
                                        style={{
                                            ...styles.seat,
                                            width: isVIP ? 38 : 26,
                                            height: isVIP ? 34 : 26,
                                            background:
                                                seat.status === "booked"
                                                    ? "#ccc"
                                                    : seat.status === "selected"
                                                        ? colors[seat.type]
                                                        : "#fff",
                                            border:
                                                seat.status === "available"
                                                    ? `1px solid ${colors[seat.type]}`
                                                    : "none"
                                        }}
                                    >

                                        {isVIP ? "🛋" : seatIndex + 1}

                                    </div>

                                );

                            })}

                        </div>

                    );

                })}

            </div>

            <div style={styles.screenContainer}>
                <div style={styles.screen}></div>
            </div>

            <div style={styles.legend}>
                <span>🛋 VIP ₹400</span>
                <span>🟪 Platinum ₹300</span>
                <span>🟧 Gold ₹220</span>
                <span>🟩 Silver ₹150</span>
            </div>

            <div style={styles.bottomBar}>

                <div>
                    <strong>{totalSeatsSelected}</strong> Seats
                </div>

                <div>₹{totalPrice}</div>

                <button
                    disabled={totalSeatsSelected === 0}
                    style={styles.bookBtn}
                    onClick={() => setShowTerms(true)}
                >
                    Proceed
                </button>

            </div>

            {showTerms && (

                <div style={styles.overlay}>

                    <div style={styles.popup}>

                        <h3>Terms & Conditions</h3>

                        <ul style={styles.terms}>
                            <li>Tickets once booked cannot be cancelled.</li>
                            <li>Please arrive 15 minutes before showtime.</li>
                            <li>Outside food not allowed.</li>
                            <li>Management reserves admission rights.</li>
                            <li>Tickets valid only for selected show.</li>
                            <li>Seat availability may change until payment.</li>
                            <li>Theatre not responsible for lost items.</li>
                            <li>Children above 3 need ticket.</li>
                            <li>No photography inside theatre.</li>
                            <li>By continuing you agree to theatre rules.</li>
                        </ul>

                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={accepted}
                                onChange={(e) =>
                                    setAccepted(e.target.checked)
                                }
                            />
                            I agree to Terms & Conditions
                        </label>

                        <button
                            disabled={!accepted}
                            style={styles.continueBtn}
                            onClick={handleTermsContinue}
                        >
                            Continue Booking
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

const styles = {
    page: { background: "#f5f5f5", minHeight: "100vh", paddingBottom: "80px" },
    header: { background: "#fff", padding: "15px", borderBottom: "1px solid #eee" },
    seatArea: { marginTop: "30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
    row: { display: "flex", gap: "6px", alignItems: "center" },
    rowLabel: { fontSize: "12px", width: "20px" },
    seat: { borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", cursor: "pointer" },
    screenContainer: { marginTop: "40px", textAlign: "center" },
    screen: { width: "60%", height: "30px", margin: "auto", background: "#dfe6e9", borderRadius: "6px", boxShadow: "0 6px 15px rgba(0,0,0,0.25)" },
    legend: { display: "flex", justifyContent: "center", gap: "25px", marginTop: "20px", fontSize: "13px" },
    bottomBar: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 -2px 10px rgba(0,0,0,0.1)" },
    bookBtn: { background: "#f84464", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "6px", cursor: "pointer" },
    overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
    popup: { background: "#fff", padding: "25px", borderRadius: "10px", width: "350px" },
    terms: { fontSize: "14px", marginTop: "10px" },
    checkbox: { display: "block", marginTop: "10px" },
    continueBtn: { marginTop: "15px", width: "100%", padding: "10px", background: "#f84464", color: "#fff", border: "none", borderRadius: "6px" }
};