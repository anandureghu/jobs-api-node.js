const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({sucess: false, "msg": "Unauthorized"});
    }
    const token = authHeader.split(" ")[1];

    if(token){
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {userId: payload.userId, name: payload.username};
            next();
        } catch (error) {
            return res.status(401).json({sucess: false, "msg": "Unauthorized"});
        }
    }

}

module.exports = authenticationMiddleware;