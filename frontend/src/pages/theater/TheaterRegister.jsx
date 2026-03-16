import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const TheaterRegister = () => {

    const navigate = useNavigate();

    const [authorizedName, setAuthorizedName] = useState("");
    const [theaterName, setTheaterName] = useState("");
    const [theaterId, setTheaterId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // AUTO FILL FROM LOGIN PAGE
    useEffect(() => {

        const savedName = localStorage.getItem("theaterName");
        const savedId = localStorage.getItem("theaterId");
        const savedEmail = localStorage.getItem("theaterEmail");
        const savedPassword = localStorage.getItem("theaterPassword");

        if (savedName) setTheaterName(savedName);
        if (savedId) setTheaterId(savedId);
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);

    }, []);

    const handleRegister = (e) => {

        e.preventDefault();

        if (!authorizedName || !theaterName || !theaterId || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        alert("Theater Registered Successfully 🎉");

        // SAVE REGISTER DATA
        localStorage.setItem("authorizedName", authorizedName);
        localStorage.setItem("theaterName", theaterName);
        localStorage.setItem("theaterId", theaterId);
        localStorage.setItem("theaterEmail", email);

        // AUTO REDIRECT TO DASHBOARD
        navigate("/theater-dashboard");

    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h2 style={styles.title}>Theater Register</h2>

                <form onSubmit={handleRegister} autoComplete="off">

                    <input
                        type="text"
                        placeholder="Authorized Person Name"
                        value={authorizedName}
                        onChange={(e) => setAuthorizedName(e.target.value)}
                        style={styles.input}
                    />

                    <input
                        type="text"
                        placeholder="Theater Name"
                        value={theaterName}
                        onChange={(e) => setTheaterName(e.target.value)}
                        style={styles.input}
                    />

                    <input
                        type="text"
                        placeholder="Theater ID"
                        value={theaterId}
                        onChange={(e) => setTheaterId(e.target.value)}
                        style={styles.input}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />

                    <button style={styles.button}>
                        Register
                    </button>

                </form>

                <p style={styles.text}>
                    Already have account?
                    <Link to="/theater-login"> Login</Link>
                </p>

            </div>

        </div>

    );

};

export default TheaterRegister;

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