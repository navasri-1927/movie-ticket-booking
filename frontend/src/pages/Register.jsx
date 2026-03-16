import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Auto fill email & password from login page
    useEffect(() => {

        const savedEmail = localStorage.getItem("loginEmail");
        const savedPassword = localStorage.getItem("loginPassword");

        if (savedEmail) {
            setEmail(savedEmail);
        }

        if (savedPassword) {
            setPassword(savedPassword);
        }

    }, []);

    const handleRegister = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        // Save user data
        localStorage.setItem("userName", name);
        localStorage.setItem("loginEmail", email);
        localStorage.setItem("loginPassword", password);

        alert("Registration Successful 🎉");

        // Redirect to main page
        navigate("/");
    };

    return (
        <div style={styles.container}>

            <div style={styles.registerBox}>

                <h1 style={styles.logo}>🎬 MovieTime</h1>
                <p style={styles.subtitle}>Create Your Account</p>

                <form onSubmit={handleRegister} autoComplete="off">

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        autoComplete="off"
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        autoComplete="off"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        autoComplete="new-password"
                    />

                    <button style={styles.button}>
                        Register
                    </button>

                </form>

                <p style={styles.loginText}>
                    Already have an account?{" "}
                    <Link to="/login" style={styles.loginLink}>
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

const styles = {

    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        fontFamily: "Arial"
    },

    registerBox: {
        width: "360px",
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

    loginText: {
        marginTop: "15px",
        fontSize: "14px"
    },

    loginLink: {
        color: "red",
        fontWeight: "bold",
        textDecoration: "none"
    }

};

export default Register;