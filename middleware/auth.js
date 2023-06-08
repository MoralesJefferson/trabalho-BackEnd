const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(401).send();
    
        const token =  req.headers.authorization.split(' ');
        
        const payload = jwt.verify(token[1],process.env.SECRET)
        req.user = payload.userId
        
        next()
        
    } catch (error) {
        return res.status(401).send();
    }

}

module.exports = auth;