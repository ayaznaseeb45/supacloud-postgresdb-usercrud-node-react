
const prisma = require("../config/db");

// 1. Create User
const createUser = async (data) => {
  return await prisma.user.create({
    data: data,
  });
};

// 2. Get All Users
const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// 3. Get Single User
const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

// 4. Update User
const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });
};

// 5. Delete User
const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
