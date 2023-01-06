const jwt = require('jsonwebtoken');
require("dotenv").config();
const generateJwt = async (details) => {
    let jwtToken = jwt.sign(details, 'Navin@123', {
        expiresIn: '30d'
    });
    return jwtToken
}

const verifyToken = (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token) {
            console.log("Token not present")
            res.status(403).send({
                message: `No token provided! `
            });
        }
        token = token.replace("Bearer ", "");
        jwt.verify(token, 'Navin@123', (err, user) => {
            if (err) {
                console.log(err)
                res.status(401).send({
                    message: "Token Expired!"
                })
            }
            console.log(user,'req.user');
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500);
    }
}

module.exports = {
    generateJwt,
    verifyToken
}