"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser, createUser } from "@/app/lib/data";
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
  const [showNewUserRow, setShowNewUserRow] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
  });

  const [editValues, setEditValues] = useState<{
    [key: string]: { name: string; email: string; role: string };
  }>(
    users.reduce((acc, user) => {
      acc[user.id] = { name: user.name, email: user.email, role: user.role };
      return acc;
    }, {} as { [key: string]: { name: string; email: string; role: string } })
  );

  const handleEditClick = (userId: string) => {
    setEditingUserId(userId);
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setShowNewUserRow(false);
    setNewUser({ name: "", email: "", role: "student" });
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
    setEditingUserId(null);
    router.refresh();
  };

  const handleDelete = async (userId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      console.log(`Suppression de l'utilisateur ${userId}`);
      router.refresh();
    }
  };

  const handleNewUserChange = (
    field: "name" | "email" | "role",
    value: string
  ) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddUser = async () => {
    console.log("handleAddUser() appelé !");

    if (!newUser.name || !newUser.email) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    console.log("Données envoyées à createUser:", newUser);

    const response = await createUser(
      newUser.name,
      newUser.email,
      newUser.role
    );

    console.log("Réponse de createUser:", response);

    if (response.success) {
      alert("Utilisateur ajouté avec succès !");
      setShowNewUserRow(false);
      setNewUser({ name: "", email: "", role: "student" });
      router.refresh();
    } else {
      alert("Erreur lors de l'ajout !");
    }
  };

  return (
    <div>
      {currentPage === 1 && (
        <button
          onClick={() => setShowNewUserRow(true)}
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
          {currentPage === 1 && showNewUserRow && (
            <tr className="border-b bg-gray-100">
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => handleNewUserChange("name", e.target.value)}
                  className="border p-1 rounded w-full"
                  placeholder="Nom"
                  required
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => handleNewUserChange("email", e.target.value)}
                  className="border p-1 rounded w-full"
                  placeholder="Email"
                  required
                />
              </td>
              <td className="py-2 px-4">
                <select
                  value={newUser.role}
                  onChange={(e) => handleNewUserChange("role", e.target.value)}
                  className="border p-1 rounded w-full"
                >
                  <option value="student">Student</option>
                  <option value="professor">Professor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={handleAddUser}
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
            </tr>
          )}

          {users.map((user) => (
            <tr key={user.id} className="border-b">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
