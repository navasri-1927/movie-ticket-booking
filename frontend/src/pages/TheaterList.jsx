import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TheaterList = () => {

    // FIXED: route param name
    const { id } = useParams();
    const movieId = id;

    const navigate = useNavigate();

    const [location, setLocation] = useState("Chennai");

    useEffect(() => {
        const savedLocation = localStorage.getItem("city") || "Chennai";
        setLocation(savedLocation);
    }, []);

    const movieName = localStorage.getItem("movieName") || "Now Showing";

    const showTimes = [
        "09:30 AM",
        "11:00 AM",
        "01:30 PM",
        "04:00 PM",
        "06:30 PM",
        "09:30 PM"
    ];

    const generateTheaters = (city) => {

        const baseNames = [
            "PVR Cinemas",
            "INOX Multiplex",
            "Cinepolis",
            "AGS Cinemas",
            "Sathyam Cinemas",
            "SPI Palazzo",
            "Rohini Silver Screens",
            "KG Cinemas",
            "LA Cinemas",
            "UFO Theatre",
            "Galaxy Cinemas",
            "Sri Murugan Theatre",
            "Apsara Multiplex",
            "Miraj Cinemas",
            "Fun Cinemas",
            "Carnival Cinemas",
            "Asian Cinemas",
            "Sangam Multiplex",
            "Gold Cinema",
            "Prasad IMAX",
            "Ariesplex",
            "Broadway Cinema",
            "Metro Cinema",
            "Eros Cinema",
            "Elite Theatre"
        ];

        return baseNames.map((name, i) => ({
            name: `${name} - ${city}`,
            location: `${city} Center`,
            shows: showTimes
        }));
    };

    const theatersByLocation = {

        Chennai: generateTheaters("Chennai"),
        Bangalore: generateTheaters("Bangalore"),
        Hyderabad: generateTheaters("Hyderabad"),
        Mumbai: generateTheaters("Mumbai"),
        Delhi: generateTheaters("Delhi"),
        Kolkata: generateTheaters("Kolkata"),
        Pune: generateTheaters("Pune"),
        Ahmedabad: generateTheaters("Ahmedabad"),
        Coimbatore: generateTheaters("Coimbatore"),
        Madurai: generateTheaters("Madurai"),
        Trichy: generateTheaters("Trichy"),
        Salem: generateTheaters("Salem"),
        Tirunelveli: generateTheaters("Tirunelveli"),
        Vellore: generateTheaters("Vellore"),
        Erode: generateTheaters("Erode"),
        Tiruppur: generateTheaters("Tiruppur"),
        Goa: generateTheaters("Goa"),
        Mysore: generateTheaters("Mysore"),
        Vizag: generateTheaters("Vizag"),
        Vijayawada: generateTheaters("Vijayawada"),
        Lucknow: generateTheaters("Lucknow"),
        Jaipur: generateTheaters("Jaipur"),
        Chandigarh: generateTheaters("Chandigarh"),
        Bhopal: generateTheaters("Bhopal"),
        Indore: generateTheaters("Indore")

    };

    const theaters = theatersByLocation[location] || [];

    return (

        <div style={styles.page}>

            <div style={styles.movieHeader}>

                <h1 style={styles.movieTitle}>
                    🎬 {movieName}
                </h1>

                <p style={styles.movieSub}>
                    Showing in {location}
                </p>

            </div>

            <div style={styles.legend}>
                <span style={{ color: "#1ea83c" }}>● Available</span>
                <span style={{ color: "#f5a623" }}>● Fast Filling</span>
            </div>

            {theaters.map((theater, index) => {

                return (

                    <div key={index} style={styles.theaterCard}>

                        <div style={styles.theaterHeader}>

                            <div>

                                <h3 style={styles.theaterName}>
                                    {theater.name}
                                </h3>

                                <p style={styles.location}>
                                    📍 {theater.location}
                                </p>

                                <p style={styles.subtitle}>
                                    Dolby Atmos • Recliner Seats • Parking
                                </p>

                            </div>

                            <div style={styles.heart}>♡</div>

                        </div>

                        <div style={styles.showContainer}>

                            {theater.shows.map((time, i) => {

                                const fastFilling = Math.random() > 0.65;

                                return (

                                    <button
                                        key={i}
                                        style={{
                                            ...styles.showButton,
                                            borderColor: fastFilling ? "#f5a623" : "#1ea83c",
                                            color: fastFilling ? "#f5a623" : "#1ea83c"
                                        }}

                                        onClick={() =>
                                            navigate(`/select-seats/${movieId}`, {
                                                state: {
                                                    movieName,
                                                    theaterName: theater.name,
                                                    time
                                                }
                                            })
                                        }

                                    >

                                        {time}

                                    </button>

                                )

                            })}

                        </div>

                    </div>

                )

            })}

        </div>

    )

}

export default TheaterList;

const styles = {

    page: {
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh"
    },

    movieHeader: {
        marginBottom: "20px"
    },

    movieTitle: {
        fontSize: "34px",
        fontWeight: "700"
    },

    movieSub: {
        color: "#666",
        marginTop: "5px"
    },

    legend: {
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
        fontSize: "14px"
    },

    theaterCard: {
        background: "#fff",
        padding: "22px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)"
    },

    theaterHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px"
    },

    theaterName: {
        fontSize: "18px",
        fontWeight: "600"
    },

    location: {
        fontSize: "13px",
        color: "#888"
    },

    subtitle: {
        fontSize: "12px",
        color: "#aaa"
    },

    heart: {
        fontSize: "22px",
        cursor: "pointer"
    },

    showContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "12px"
    },

    showButton: {
        padding: "10px 18px",
        background: "#fff",
        border: "2px solid",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "500"
    }

};