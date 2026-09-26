
import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  age: "",
  city: "",
};

function UserForm({ selectedUser, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  // Fill form when editing a user
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name ?? "",
        email: selectedUser.email ?? "",
        age: selectedUser.age ?? "",
        city: selectedUser.city ?? "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [selectedUser]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      ...(formData.age !== "" && {
        age: Number(formData.age),
      }),
      ...(formData.city.trim() !== "" && {
        city: formData.city.trim(),
      }),
    };

    // PATCH: Send only changed fields
    if (selectedUser) {
      const changedData = {};

      for (const key of Object.keys(data)) {
        if (data[key] !== selectedUser[key]) {
          changedData[key] = data[key];
        }
      }

      if (Object.keys(changedData).length === 0) {
        alert("No changes detected");
        return;
      }

      data = changedData;
    }

    try {
      setLoading(true);

      await onSubmit(data);

      setFormData(initialForm);
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-5 text-xl font-semibold">
        {selectedUser ? "Edit User" : "Add New User"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">

        <input
          type="text"
          name="name" aria-label="Full name" autoComplete="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
          className="rounded-lg border border-gray-300 p-3"
        />

        <input
          type="email"
          name="email" aria-label="Email address" autoComplete="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="rounded-lg border border-gray-300 p-3"
        />

        <input
          type="number"
          name="age" aria-label="Age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          min="1"
          step="1"
          className="rounded-lg border border-gray-300 p-3"
        />

        <input
          type="text"
          name="city" aria-label="City" autoComplete="address-level2"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 p-3"
        />

      </div>

      <div className="mt-5 flex gap-3">

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : selectedUser
              ? "Update User"
              : "Add User"}
        </button>

        {selectedUser && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-6 py-3"
          >
            Cancel
          </button>
        )}

      </div>
    </form>
  );
}

export default UserForm;

