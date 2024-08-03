var jwt = require('jsonwebtoken');

function authMiddle(req,res,next){
    const token = req.headers?.auth;

    if(!token){
        return res.status(403).json({'error':"Authentication Problem"});
    }

    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(err) {
        res.status(403).json({'error':"Authentication Problem"});
    }
}

module.exports = authMiddle