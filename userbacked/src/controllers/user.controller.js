
const userModel = require("../models/user.model");

const {
  createUserSchema,
  updateUserSchema,
} = require("../schemas/user.schema");


// 1. Create User
const createUser = async (req, res) => {
  try {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const user = await userModel.createUser(result.data);

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// 2. Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();

    return res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// 3. Get Single User
const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// 4. Update User (PATCH)
const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const result = updateUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    if (Object.keys(result.data).length === 0) {
      return res.status(400).json({
        message: "Provide at least one field to update",
      });
    }

    const user = await userModel.updateUser(id, result.data);

    return res.status(200).json({
      message: "User updated successfully",
      data: user,
    });

  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// 5. Delete User
const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    await userModel.deleteUser(id);

    return res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Export Controllers
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
