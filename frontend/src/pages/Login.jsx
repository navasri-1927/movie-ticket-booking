import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (email && password) {

            // save login session
            localStorage.setItem("user", JSON.stringify({ email }));
            localStorage.setItem("token", "userLoggedIn");

            alert("Login Successful 🎉");

            // redirect to payment if coming from seat selection
            if (location.state) {
                navigate("/payment", { state: location.state });
            } else {
                navigate("/");
            }

        } else {
            alert("Please enter email and password");
        }
    };

    return (
        <div style={styles.container}>

            <div style={styles.loginBox}>

                <h1 style={styles.logo}>🎬 MovieTime</h1>
                <p style={styles.subtitle}>Book your favourite movies</p>

                {/* FORM */}
                <form onSubmit={handleLogin} autoComplete="off">

                    <input
                        type="email"
                        name="user_email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        autoComplete="off"
                    />

                    <input
                        type="password"
                        name="user_password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        autoComplete="new-password"
                    />

                    <button type="submit" style={styles.button}>
                        Login
                    </button>

                </form>

                <p style={styles.registerText}>
                    Don't have an account?{" "}
                    <Link to="/register" style={styles.registerLink}>
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;

const styles = {

    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        fontFamily: "Arial"
    },

    loginBox: {
        width: "350px",
        padding: "40px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        textAlign: "center",
        borderTop: "6px solid red"
    },

    logo: {
        color: "red",
        marginBottom: "5px"
    },

    subtitle: {
        color: "#777",
        marginBottom: "25px"
    },

    input: {
        width: "100%",
        padding: "12px",
        margin: "10px 0",
        borderRadius: "6px",
        border: "1px solid #ddd",
        fontSize: "14px"
    },

    button: {
        width: "100%",
        padding: "12px",
        marginTop: "10px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        cursor: "pointer"
    },

    registerText: {
        marginTop: "15px",
        fontSize: "14px"
    },

    registerLink: {
        color: "red",
        fontWeight: "bold",
        textDecoration: "none"
    }

};