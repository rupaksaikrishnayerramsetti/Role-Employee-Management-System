const crypto = require("crypto");
const jwt = require("jsonwebtoken")

function hashPassword(password) {
    const sha1Hash = crypto.createHash("sha1");
    sha1Hash.update(password);
    return sha1Hash.digest("hex");
}

function JWTTokenData(token){
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

function JWTTokenCreation(data){
    return jwt.sign(data, process.env.JWT_SECRET_KEY)
}

module.exports = {
    hashPassword,
    JWTTokenData,
    JWTTokenCreation
}
