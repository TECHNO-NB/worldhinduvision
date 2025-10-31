"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: "user" | "admin" | "volunteer";
  forVolunteer: boolean;
  volunteerApproved?: boolean;
  avatar?: string;
}

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<
    "users" | "volunteers" | "requests"
  >("users");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: "delete" | "approve" | "role" | null;
    user?: User;
    newRole?: User["role"];
  }>({ type: null });

  // ✅ Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/get-all-user`
        );
        setUsers(response.data?.data || []);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load users!");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Handle confirmation
  const handleConfirm = async () => {
    if (!confirmAction.user || !confirmAction.type) return;

    try {
      if (confirmAction.type === "delete") {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${confirmAction.user._id}`
        );
        setUsers((prev) =>
          prev.filter((u) => u._id !== confirmAction.user?._id)
        );
        toast.success("User deleted!");
      } else if (confirmAction.type === "approve") {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${confirmAction.user._id}/approve-volunteer`
        );
        setUsers((prev) =>
          prev.map((u) =>
            u._id === confirmAction.user?._id
              ? { ...u, volunteerApproved: true }
              : u
          )
        );
        toast.success("Volunteer approved!");
      } else if (confirmAction.type === "role") {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${confirmAction.user._id}/role`,
          { role: confirmAction.newRole }
        );
        setUsers((prev) =>
          prev.map((u) =>
            u._id === confirmAction.user?._id
              ? { ...u, role: confirmAction.newRole! }
              : u
          )
        );
        toast.success("Role updated successfully!");
      }
    } catch {
      toast.error("Action failed!");
    } finally {
      setConfirmAction({ type: null });
    }
  };

  // ✅ Filter users by tab
  const filteredUsers = () => {
    switch (activeTab) {
      case "users":
        return users;
      case "volunteers":
        return users.filter(
          (u) => u.forVolunteer && u.avatar && u.role === "volunteer"
        );
      case "requests":
        return users.filter(
          (u) => u.forVolunteer && u.role !== "volunteer" && u.avatar !== null
        );
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading users...</div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {["users", "volunteers", "requests"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab === "users"
              ? "Users"
              : tab === "volunteers"
              ? "Volunteers"
              : "Volunteer Requests"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              {activeTab !== "users" && <th className="p-2 border">Avatar</th>}
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers().map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                {activeTab !== "users" && (
                  <td className="p-2 border">
                    {/* ✅ Avatar Preview Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <img
                          src={user.avatar || "https://via.placeholder.com/80"}
                          alt={user.fullName}
                          className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80"
                          onClick={() => setSelectedImage(user.avatar!)}
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>{user.fullName}'s Avatar</DialogTitle>
                        </DialogHeader>
                        <img
                          src={selectedImage || ""}
                          alt={user.fullName}
                          className="w-full h-auto rounded-lg"
                        />
                      </DialogContent>
                    </Dialog>
                  </td>
                )}
                <td className="p-2 border">{user.fullName}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.phoneNumber}</td>
                <td className="p-2 border">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      setConfirmAction({
                        type: "role",
                        user,
                        newRole: e.target.value as User["role"],
                      })
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="volunteer">Volunteer</option>
                  </select>
                </td>
                <td className="p-2 border flex gap-2">
                  {activeTab === "requests" && (
                    <button
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() =>
                        setConfirmAction({ type: "approve", user })
                      }
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setConfirmAction({ type: "delete", user })}
                  >
                    <Trash2 size={16} />
                  </button>
               
                </td>
              </tr>
            ))}
            {filteredUsers().length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Confirmation Modal */}
      <AlertDialog
        open={!!confirmAction.type}
        onOpenChange={(open) => {
          if (!open) setConfirmAction({ type: null });
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction.type === "delete"
                ? "Delete User?"
                : confirmAction.type === "approve"
                ? "Approve Volunteer?"
                : "Confirm Role Change?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction.type === "delete" &&
                `This action will permanently delete ${confirmAction.user?.fullName}.`}
              {confirmAction.type === "approve" &&
                `You are about to approve ${confirmAction.user?.fullName} as a volunteer.`}
              {confirmAction.type === "role" &&
                `You are changing ${confirmAction.user?.fullName}'s role to ${confirmAction.newRole}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
