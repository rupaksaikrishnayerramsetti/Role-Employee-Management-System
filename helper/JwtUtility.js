const crypto = require("crypto");
const jwt = require("jsonwebtoken")

/**
 * Hashes the provided password using SHA-1 algorithm.
 * @param {string} password - The password to be hashed.
 * @returns {string} - The hashed password.
 */
function hashPassword(password) {
    const sha1Hash = crypto.createHash("sha1");
    sha1Hash.update(password);
    return sha1Hash.digest("hex");
}

/**
 * Verifies and decodes a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {Object|string} - Decoded token data or "Invalid token" if verification fails.
 */
function JWTTokenData(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      console.error(error);
      return "Invalid token";
    }
  }
  
  /**
 * Creates a new JWT token based on the provided data.
 * @param {Object} data - The data to be encoded in the token.
 * @returns {string} - The generated JWT token.
 */
  function JWTTokenCreation(data) {
    try {
      return jwt.sign(data, process.env.JWT_SECRET_KEY);
    } catch (error) {
      console.error(error);
      return "Error creating JWT token";
    }
  }
  
module.exports = {
    hashPassword,
    JWTTokenData,
    JWTTokenCreation
}
