const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwtAuthorization');
const hashed = require('../utils/generateHashPassowrd');
const user = db.user;
const Op = db.Sequelize.Op;

exports.register = async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'content can not be empty!'
        });
        return
    }
    const { name, email, password } = req.body;
    const hashedpassword = await hashed.generateHashPwd(password);
    const users = {
        name,
        email,
        password: hashedpassword
    };

    user.create(users).then(data => {
        res.send({
            message: 'User Register Successfully!',
            data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "something wrong"
        });
    });

}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: 'Email and Passowrd is Required!'
            });
        }
        let getSingleUser = await user.findOne({
            where: { email: req.body.email }
        }).then(async (data) => {
            let checkPassowrdmatch = await hashed.validatePassword(req.body.password, await hashed.generateHashPwd(password));
            if (data.email === req.body.email && checkPassowrdmatch) {
                return data;
            } else {
                return res.status(400).send({
                    message: 'Email or Passowrd was Wrong!'
                });
            }
        }
        ).catch(err => {
            res.status(500).send({
                message: `Cannot find user with is email ${req.body.email}`
            })
        });

        if (getSingleUser) {
            const token = await jwt.generateJwt({
                id: getSingleUser.id,
                name: getSingleUser.name,
                email: getSingleUser.email,
                password: getSingleUser.password
            });
            res.status(200).send({
                message: 'user login successfully!',
                token
            })
        } else {
            res.status(404).send({
                message: `Cannot find user with is email ${req.body.email}`
            });
        }

    } catch (error) {
        console.log(error);
    }
}

exports.getSingleUser = async (req, res) => {
    const id = req.params.id;
    user.findByPk(id).then(data => {
        if (data) {
            res.send({
                message: 'get single user details!',
                data
            });
        } else {
            res.status(404).send({
                message: `Cannot find user with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving user with id=${id}.`
        });
    })
}
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    user.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe user was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

exports.getAllUsers = (req, res) => {
    user.findAll()
        .then(data => {
            res.send({
                message: 'get all user details!',
                data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    user.destroy({
        where: { id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

exports.deleteAllUser = (req, res) => {
    user.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} user were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};