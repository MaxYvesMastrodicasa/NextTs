"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { updateUser, createUser, deleteUser } from "@/app/lib/data";
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function UsersTable({
  users,
  currentPage,
}: {
  users: any[];
  currentPage: number;
}) {
  const router = useRouter();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [editValues, setEditValues] = useState<{
    [key: string]: { name: string; email: string; role: string };
  }>(
    Object.fromEntries(
      users.map((user) => [
        user.id,
        { name: user.name, email: user.email, role: user.role },
      ])
    )
  );

  const handleEditClick = (userId: string) => {
    setEditingUserId(userId);
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setIsModalOpen(false);
    setNewUser({ name: "", email: "", password: "", role: "student" });
  };

  const handleChange = (
    userId: string,
    field: "name" | "email" | "role",
    value: string
  ) => {
    setEditValues((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value },
    }));
  };

  const handleSave = async (userId: string) => {
    const { name, email, role } = editValues[userId];
    await updateUser(userId, name, email, role);
    toast.success("User updated successfully!");
    setEditingUserId(null);
    router.refresh();
  };

  const handleDelete = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      toast.success("User deleted successfully!", { icon: "🗑️" });
      router.refresh();
    }
  };

  const handleNewUserChange = (
    field: "name" | "email" | "password" | "role",
    value: string
  ) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please complete all fields!");
      return;
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const response = await createUser({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      role: newUser.role,
      createdAt: new Date().toISOString(),
    });

    if (response.success) {
      toast.success("User added successfully!");
      setIsModalOpen(false);
      setNewUser({ name: "", email: "", password: "", role: "student" });
      router.refresh();
    } else {
      toast.error("Error adding user!");
    }
  };

  return (
    <div>
      {currentPage === 1 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-3 flex items-center"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Ajouter un utilisateur
        </button>
      )}

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              {editingUserId === user.id ? (
                <>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editValues[user.id]?.name || ""}
                      onChange={(e) =>
                        handleChange(user.id, "name", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="email"
                      value={editValues[user.id]?.email || ""}
                      onChange={(e) =>
                        handleChange(user.id, "email", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <select
                      value={editValues[user.id]?.role || ""}
                      onChange={(e) =>
                        handleChange(user.id, "role", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      onClick={() => handleSave(user.id)}
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEditClick(user.id)}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-gray-500 text-white p-2 rounded"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">Ajouter un utilisateur</h2>

            <div className="flex flex-col mb-3">
              <label className="font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => handleNewUserChange("name", e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Nom"
                required
              />
            </div>

            <div className="flex flex-col mb-3">
              <label className="font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => handleNewUserChange("email", e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex flex-col mb-3">
              <label className="font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => handleNewUserChange("password", e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Mot de passe"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="font-medium text-gray-700 mb-1">Rôle</label>
              <select
                value={newUser.role}
                onChange={(e) => handleNewUserChange("role", e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleAddUser}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Valider
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}


      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
