const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({sucess: false, "msg": "Unauthorized"});
    }
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = authenticationMiddleware;