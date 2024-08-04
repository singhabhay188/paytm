const jwt = require('jsonwebtoken');

function authMiddle(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token after 'Bearer '

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
