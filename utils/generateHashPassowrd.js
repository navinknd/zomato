const bcrypt = require('bcryptjs');

const saltRounds = 10;


const generateHashPwd = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    });
};

const validatePassword = (enteredPwd, hashedPwd) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(enteredPwd, hashedPwd, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    });
};

module.exports = {
    generateHashPwd,
    validatePassword
}