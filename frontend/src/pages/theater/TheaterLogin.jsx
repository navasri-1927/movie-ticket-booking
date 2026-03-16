import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const TheaterLogin = () => {

    const navigate = useNavigate();

    const [theaterName, setTheaterName] = useState("");
    const [theaterId, setTheaterId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        if (theaterName && theaterId && email && password) {
            alert("Theater Owner Login Successful");
            navigate("/theater-dashboard");
        } else {
            alert("Please fill all fields");
        }

    };

    // SAVE VALUES FOR REGISTER PAGE
    const handleRegisterClick = () => {

        localStorage.setItem("theaterName", theaterName);
        localStorage.setItem("theaterId", theaterId);
        localStorage.setItem("theaterEmail", email);
        localStorage.setItem("theaterPassword", password);

    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h2 style={styles.title}>Theater Owner Login</h2>

                <form onSubmit={handleLogin} autoComplete="off">

                    <input
                        type="text"
                        placeholder="Theater Name"
                        value={theaterName}
                        autoComplete="off"
                        onChange={(e) => setTheaterName(e.target.value)}
                        style={styles.input}
                    />

                    <input
                        type="text"
                        placeholder="Theater ID"
                        value={theaterId}
                        autoComplete="off"
                        onChange={(e) => setTheaterId(e.target.value)}
                        style={styles.input}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />

                    <button style={styles.button}>
                        Login
                    </button>

                </form>

                <p style={styles.text}>
                    Don't have account?
                    <Link to="/theater-register" onClick={handleRegisterClick}> Register</Link>
                </p>

            </div>

        </div>

    );

};

export default TheaterLogin;

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5"
    },
    card: {
        width: "400px",
        background: "#fff",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#e50914"
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        border: "1px solid #ddd",
        borderRadius: "5px"
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "#e50914",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold"
    },
    text: {
        textAlign: "center",
        marginTop: "15px"
    }
};