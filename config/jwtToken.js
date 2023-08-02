const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expressIn:"3d" });
};

module.exports= { generateToken };