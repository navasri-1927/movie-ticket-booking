// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (roles = []) => async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Not authorized" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized" });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
    }
    next();
};

module.exports = { protect, adminOnly };