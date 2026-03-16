import { useState } from "react";

const HelpSupport = () => {

    const [activeIndex, setActiveIndex] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const faqs = [
        {
            question: "How do I book movie tickets?",
            answer:
                "Browse movies, select your preferred theater and showtime, choose seats and confirm your booking."
        },
        {
            question: "How can I cancel my booking?",
            answer:
                "Go to profile settings → bookings → select your ticket → cancel booking."
        },
        {
            question: "What payment methods are supported?",
            answer:
                "We support UPI, debit card, credit card and digital wallets."
        },
        {
            question: "Why is my payment failing?",
            answer:
                "Payment may fail due to bank restrictions, insufficient balance, or network issues."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleSubmit = () => {

        if (!name || !email || !message) {
            alert("Please fill all fields");
            return;
        }

        setShowPopup(true);

        setName("");
        setEmail("");
        setMessage("");
    };

    return (

        <div style={styles.container}>

            <h1 style={styles.title}>Help & Support</h1>

            <p style={styles.subtitle}>
                Need help with booking or payment? We're here to assist you.
            </p>

            {/* FAQ SECTION */}

            <div style={styles.section}>

                <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>

                {faqs.map((faq, index) => (

                    <div key={index} style={styles.faqItem}>

                        <div
                            style={styles.question}
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                        </div>

                        {activeIndex === index && (
                            <div style={styles.answer}>
                                {faq.answer}
                            </div>
                        )}

                    </div>

                ))}

            </div>


            {/* CONTACT FORM */}

            <div style={styles.section}>

                <h2 style={styles.sectionTitle}>Contact Support</h2>

                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <textarea
                    placeholder="Describe your issue..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={styles.textarea}
                />

                <button
                    style={styles.button}
                    onClick={handleSubmit}
                >
                    Submit Request
                </button>

            </div>


            {/* SUPPORT INFO */}

            <div style={styles.supportInfo}>

                <h3>Customer Support</h3>

                <p>Email: support@movietime.com</p>
                <p>Phone: +91 98765 43210</p>
                <p>Support Hours: 9 AM – 10 PM</p>

            </div>


            {/* SUCCESS POPUP */}

            {showPopup && (

                <div style={styles.popupOverlay}>

                    <div style={styles.popupCard}>

                        <h2 style={{ color: "#e50914" }}>✅ Request Submitted</h2>

                        <p>Your support request has been sent successfully.</p>

                        <button
                            style={styles.popupButton}
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
};

export default HelpSupport;



const styles = {

    container: {
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        fontFamily: "Arial"
    },

    title: {
        textAlign: "center",
        color: "#e50914"
    },

    subtitle: {
        textAlign: "center",
        color: "#666",
        marginBottom: "40px"
    },

    section: {
        marginBottom: "40px"
    },

    sectionTitle: {
        marginBottom: "20px"
    },

    faqItem: {
        border: "1px solid #ddd",
        marginBottom: "10px",
        borderRadius: "6px"
    },

    question: {
        padding: "15px",
        cursor: "pointer",
        background: "#f7f7f7",
        fontWeight: "bold"
    },

    answer: {
        padding: "15px",
        background: "#fff"
    },

    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "6px"
    },

    textarea: {
        width: "100%",
        height: "120px",
        padding: "12px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "6px"
    },

    button: {
        background: "#e50914",
        color: "#fff",
        border: "none",
        padding: "12px 20px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px"
    },

    supportInfo: {
        textAlign: "center",
        background: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px"
    },


    /* POPUP */

    popupOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    popupCard: {
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        textAlign: "center",
        width: "350px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
    },

    popupButton: {
        marginTop: "20px",
        padding: "10px 20px",
        background: "#e50914",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    }

};