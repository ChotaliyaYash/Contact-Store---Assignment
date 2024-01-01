// package imports
const jwt = require("jsonwebtoken")
const { errorHandeler } = require('../utils/errorHandler');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            errorHandeler("User not authorized", 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");

        if (!decoded) {
            errorHandeler("User not authorized", 401);
        }

        req.user = {
            userId: decoded.id,
        };

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = verifyToken