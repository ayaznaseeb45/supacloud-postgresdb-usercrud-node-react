
const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

// Create User
router.post("/", userController.createUser);

// Get All Users
router.get("/", userController.getAllUsers);

// Get Single User
router.get("/:id", userController.getUserById);

// Update User (Partial Update)
router.patch("/:id", userController.updateUser);

// Delete User
router.delete("/:id", userController.deleteUser);

module.exports = router;
