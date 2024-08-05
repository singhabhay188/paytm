const jwt = require('jsonwebtoken');

function authMiddle(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Authentication token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error("Authentication error:", err); // Log error for debugging
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = authMiddle
