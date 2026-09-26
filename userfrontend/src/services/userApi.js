import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Get all users
export const getUsers = () => api.get("/users");

// Get single user
export const getUserById = (id) => api.get(`/users/${id}`);

// Create user
export const createUser = (data) => api.post("/users", data);

// Update selected fields
export const updateUser = (id, data) =>
  api.patch(`/users/${id}`, data);

// Delete user
export const deleteUser = (id) =>
  api.delete(`/users/${id}`);

export default api;
