import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setAdminLoggedIn }) => {

    const navigate = useNavigate();

    const [adminId, setAdminId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // ✅ Admin ID must be exactly 4 numbers
        if (!/^\d{4}$/.test(adminId)) {
            alert("Admin ID must be exactly 4 numbers");
            return;
        }

        if (adminId && email && password) {

            setAdminLoggedIn(true);   // ✅ THIS WAS MISSING

            alert("Admin Login Successful");

            navigate("/admin-dashboard");

        } else {
            alert("Please fill all fields");
        }
    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h2 style={styles.title}>Admin Login</h2>

                <form onSubmit={handleLogin} autoComplete="off">

                    <input
                        type="text"
                        placeholder="Admin ID"
                        value={adminId}
                        maxLength="4"
                        inputMode="numeric"
                        pattern="[0-9]{4}"
                        autoComplete="off"
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setAdminId(value);
                        }}
                        style={styles.input}
                    />

                    <input
                        type="email"
                        placeholder="Admin Email"
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
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
};

export default AdminLogin;

const styles = {

    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5"
    },

    card: {
        width: "380px",
        background: "#fff",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    },

    title: {
        textAlign: "center",
        marginBottom: "25px",
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
        fontWeight: "bold",
        cursor: "pointer"
    }

};