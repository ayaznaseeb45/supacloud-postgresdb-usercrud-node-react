
function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-200 p-5">
        <h2 className="text-xl font-semibold">
          All Users ({users.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Age</th>
              <th className="p-4">City</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >

                  <td className="p-4">{user.id}</td>

                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">
                    {user.age ?? "-"}
                  </td>

                  <td className="p-4">
                    {user.city ?? "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => onEdit(user)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(user.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default UserTable;
