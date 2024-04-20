const fs = require("fs")
const {JWTTokenData} = require("../helper/JwtUtility")

/**
 * Logs the request details to a specified file.
 * @param {string} filename - The name of the file to log the request details.
 * @returns {Function} - A middleware function that logs the request details.
 */
function logging(filename) {
    return (req, res, next) => {
        const logMessage = `${Date.now()}: ${req.method} ${req.path}`;

        fs.appendFile(filename, '\n' + logMessage , (err) => {
            if (err) {
                console.error('Error logging request:', err);
                res.status(500).json({ error: 'Failed to log the request' });
            } else {
                next();
            }
        });
    };
}

/**
 * Middleware function to intercept and handle requests based on their paths.
 * @returns {Function} - A middleware function that intercepts and handles requests.
 */
function intercept(req, res, next) {
    switch (true) {
      case req.path === "/api/create-admin" || req.path === "/api/login":
        next();
        break;
      case req.path.startsWith("/api/roles") || req.path.startsWith("/api/employees") || req.path === "/api/employee-role" :
        evaluateJwt(req, res, next);
        break;
      default:
        res.status(404).send("The requested resource was not found on the server. Please check the URL path and try again.");
        break;
    }
  }  

/**
 * Middleware function to evaluate and handle JWT tokens.
 * @returns {Function} - A middleware function that evaluates and handles JWT tokens.
 */
function evaluateJwt(req, res, next) {
    if (req?.headers?.authorization) {
        const result = JWTTokenData(req.headers.authorization);
        if (result === "Invalid token") {
            return res.status(401).json({ error: "Invalid JWT token" });
        } else {
            req.tokenData = result;function evaluateJwt(req, res, next) {
                try {
                    if (!req.headers.authorization) {
                        throw new Error("JWT token missing in headers");
                    }
                    const result = JWTTokenData(req.headers.authorization);
                    if (result === "Invalid token") {
                        throw new Error("Invalid JWT token");
                    }
                    req.tokenData = result;
                    next();
                } catch (error) {
                    res.status(401).json({ error: error.message });
                }
            }
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