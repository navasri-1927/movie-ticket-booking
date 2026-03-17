import React, { useState } from "react";
import axios from "axios";

const LoginModal = ({ closeModal }) => {

    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const url = isLogin
                ? "https://movie-ticket-booking-ited.onrender.com/api/auth/login"
                : "https://movie-ticket-booking-ited.onrender.com/api/auth/register";

            const res = await axios.post(url, formData);

            if (isLogin) {

                localStorage.setItem("token", res.data.token);

                alert("Login Successful");

                closeModal();

            } else {

                alert("Registration Successful");
                setIsLogin(true);

            }

        } catch (error) {

            alert(error.response?.data?.message || "Something went wrong");

        }

    };

    return (
        <div className="modal-overlay">

            <div className="modal-box">

                <button className="close-btn" onClick={closeModal}>
                    ✖
                </button>

                <h2>{isLogin ? "Sign In" : "Create Account"}</h2>

                <form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="submit-btn">
                        {isLogin ? "Login" : "Register"}
                    </button>

                </form>

                <p className="switch-text">

                    {isLogin ? "New user?" : "Already have an account?"}

                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? " Register here" : " Login here"}
                    </span>

                </p>

            </div>

            <style>{`

.modal-overlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.7);
display:flex;
align-items:center;
justify-content:center;
z-index:1000;
}

.modal-box{
background:#1f1f1f;
padding:35px;
width:360px;
border-radius:10px;
color:white;
text-align:center;
position:relative;
box-shadow:0 10px 30px rgba(0,0,0,0.5);
}

.modal-box h2{
margin-bottom:20px;
}

.modal-box input{
width:100%;
padding:12px;
margin-bottom:15px;
border:none;
border-radius:6px;
background:#2b2b2b;
color:white;
}

.submit-btn{
width:100%;
padding:12px;
background:#f84464;
border:none;
border-radius:6px;
color:white;
font-weight:bold;
cursor:pointer;
}

.submit-btn:hover{
background:#d81b4a;
}

.switch-text{
margin-top:15px;
font-size:14px;
}

.switch-text span{
color:#f84464;
cursor:pointer;
font-weight:bold;
}

.close-btn{
position:absolute;
top:10px;
right:15px;
background:none;
border:none;
color:white;
font-size:18px;
cursor:pointer;
}

`}</style>

        </div>
    );
};

export default LoginModal;