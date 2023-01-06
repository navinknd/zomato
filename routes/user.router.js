const userController = require('../controllers/user.controller');
let router = require('express').Router();
const { verifyToken } = require('../utils/jwtAuthorization');
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getAll", verifyToken, userController.getAllUsers);
router.get("/getOne/:id", verifyToken, userController.getSingleUser);
router.put("/update/:id", verifyToken, userController.updateUser);
router.delete("/delete/:id", verifyToken, userController.deleteUser);
router.delete("/deleteAll", verifyToken, userController.deleteAllUser);

module.exports = router;