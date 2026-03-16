import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {

    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(
        localStorage.getItem("profileImage") || null
    );

    const [name, setName] = useState(
        localStorage.getItem("name") || "Your Name"
    );

    const [email, setEmail] = useState(
        localStorage.getItem("email") || "your@email.com"
    );

    const [password, setPassword] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
        }
    };

    const handleSave = () => {

        if (profileImage) {
            localStorage.setItem("profileImage", profileImage);
        }

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        alert("Profile Updated Successfully");

        navigate("/");
    };

    const handleDelete = () => {
        if (window.confirm("Delete your account?")) {
            localStorage.clear();
            alert("Account deleted");
            navigate("/login");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h2 style={styles.title}>Profile Settings</h2>

                <div style={styles.imageSection}>

                    <img
                        src={
                            profileImage ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="profile"
                        style={styles.profileImage}
                    />

                    <input
                        type="file"
                        onChange={handleImageChange}
                    />

                </div>

                <div style={styles.field}>
                    <label>Name</label>
                    <input
                        style={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div style={styles.field}>
                    <label>Email</label>
                    <input
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div style={styles.field}>
                    <label>Password</label>
                    <input
                        type="password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </div>

                <button
                    style={styles.saveBtn}
                    onClick={handleSave}
                >
                    Save Changes
                </button>

                <button
                    style={styles.deleteBtn}
                    onClick={handleDelete}
                >
                    Delete Account
                </button>

                <button
                    style={styles.logoutBtn}
                    onClick={handleLogout}
                >
                    Sign Out
                </button>

            </div>

        </div>

    );
};

export default ProfileSettings;

const styles = {

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f5f5"
    },

    card: {
        background: "#fff",
        padding: "40px",
        width: "400px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
    },

    title: {
        textAlign: "center",
        marginBottom: "25px"
    },

    imageSection: {
        textAlign: "center",
        marginBottom: "20px"
    },

    profileImage: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "10px"
    },

    field: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "15px"
    },

    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px"
    },

    saveBtn: {
        width: "100%",
        padding: "10px",
        background: "#e50914",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        marginTop: "10px",
        cursor: "pointer"
    },

    deleteBtn: {
        width: "100%",
        padding: "10px",
        background: "#555",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        marginTop: "10px",
        cursor: "pointer"
    },

    logoutBtn: {
        width: "100%",
        padding: "10px",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        marginTop: "10px",
        cursor: "pointer"
    }

};