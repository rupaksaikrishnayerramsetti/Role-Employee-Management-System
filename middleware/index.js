const fs = require("fs")
const {JWTTokenData} = require("../helper/JwtUtility")

function logging(filename) {
    return (req, res, next) => {
        const logMessage = `${Date.now()}: ${req.method} ${req.path}`;

        fs.appendFile(filename, '\n' + logMessage , (err) => {
            if (err) {
                console.error('Error logging request:', err);
                res.status(500).json({ error: 'Failed to log the request' });
            } else {
                // console.log('Request logged:', logMessage);
                next();
            }
        });
    };
}

function intercept(req, res, next) {
    switch (req.path) {
        case "/api/create-admin":
        case "/api/login":
            next();
            break;
        case "/api/roles":
        case "/api/employees":
        case "/api/employee-role":
            evaluateJwt(req, res, next);
            break
        default:
            res.status(404).send("The requested resource was not found on the server. Please check the URL path and try again.");
            break
    }
}

function evaluateJwt(req, res, next) {
    if (req?.headers?.authorization) {
        const result = JWTTokenData(req.headers.authorization);
        if (result === "Invalid token") {
            return res.status(401).json({ error: "Invalid JWT token" });
        } else {
            req.tokenData = result;
            next();
        }
    } else {
        return res.status(401).json({ error: "JWT token missing in headers" });
    }
}

module.exports = {
    logging,
    intercept,
    // evaluateJwt
}