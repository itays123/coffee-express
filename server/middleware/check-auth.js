const jwt = require('jsonwebtoken');

const getAuthToken = header => {
    try {
        const token = header.split(" ")[1];
        if (!token || token === '') throw new Error('invalid header');
        const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN);
        if (!decodedToken) throw new Error('invalid token');
        return decodedToken;
    } catch(err) {
        throw err;
    }
}

module.exports = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        const decodedToken = getAuthToken(authHeader);
        req.userId = decodedToken.userId;
        next();
    } catch(err) {
        req.userId = null;
        next();
    }
}