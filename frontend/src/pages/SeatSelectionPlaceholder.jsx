import React from "react";
import { useLocation } from "react-router-dom";

const SeatSelectionPlaceholder = () => {
    const location = useLocation();

    return (
        <div style={{ padding: "40px" }}>
            <h2>Seat Selection Page</h2>

            <p>This page will show theater seat layout later.</p>

            <h3>Show Details</h3>

            <pre>
                {JSON.stringify(location.state, null, 2)}
            </pre>
        </div>
    );
};

export default SeatSelectionPlaceholder;