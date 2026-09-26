
import { useEffect, useState } from "react";

import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userApi";

function UsersPage() {

  // Store all users
  const [users, setUsers] = useState([]);

  // Store selected user for editing
  const [selectedUser, setSelectedUser] = useState(null);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getUsers();

      setUsers(response.data.data);

    } catch (error) {
      setError("Failed to fetch users");
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  // Fetch users when page loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Create or Update User
  const handleSubmit = async (data) => {
    try {
      setError("");

      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        setSelectedUser(null);
      } else {
        await createUser(data);
      }

      await fetchUsers();

    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";

      setError(message);
      throw error;
    }
  };

  // 3. Select User for Editing
  const handleEdit = (user) => {
    setSelectedUser(user);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 4. Delete User
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteUser(id);

      if (selectedUser?.id === id) {
        setSelectedUser(null);
      }

      await fetchUsers();

    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  };

  return (
    <div className="directory-page">

      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <div>
          <h1 className="directory-heading text-3xl font-bold text-gray-900 sm:text-4xl">
            User directory
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your people and keep every detail up to date.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Add / Edit Form */}
        <UserForm
          selectedUser={selectedUser}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedUser(null)}
        />

        {/* Users Table */}
        {loading ? (
          <p className="text-center text-gray-500">
            Loading users...
          </p>
        ) : (
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

      </div>

    </div>
  );
}

export default UsersPage;

