"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface Temple {
  id: string;
  templeName: string;
  address: string;
  image: string;
  descriptions: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function TempleAdmin() {
  const [temples, setTemples] = useState<Temple[]>([]);

  // --- Add Modal State ---
  const [addOpen, setAddOpen] = useState(false);
  const [addImage, setAddImage] = useState<File | null>(null);
  const [addImagePreview, setAddImagePreview] = useState<string>("");
  const [addData, setAddData] = useState({
    templeName: "",
    address: "",
    descriptions: "",
  });
  const [addLoading, setAddLoading] = useState(false);

  // --- Edit Modal State ---
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [editData, setEditData] = useState({
    templeName: "",
    address: "",
    descriptions: "",
  });
  const [editLoading, setEditLoading] = useState(false);

  // --- Delete Modal State ---
  const [deleteOpenId, setDeleteOpenId] = useState<string | null>(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

  // ✅ Fetch all temples
  const fetchAllTemples = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/get-all-temple`
      );
      if (res.data.status === 200) {
        setTemples(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch temples");
    }
  };

  useEffect(() => {
    fetchAllTemples();
  }, []);

  // ✅ Handle Add Image
  const handleAddFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAddImage(file);
    const reader = new FileReader();
    reader.onload = () => setAddImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ✅ Handle Add Temple
  const handleAddTemple = async () => {
    if (!addData.templeName || !addImage) {
      toast.error("Temple name and image are required");
      return;
    }

    try {
      setAddLoading(true);
      const formData = new FormData();
      formData.append("templeName", addData.templeName);
      formData.append("address", addData.address);
      formData.append("descriptions", addData.descriptions);
      formData.append("image", addImage);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/upload-temple`,
        formData
      );

      if (res.data.status === 201) {
        toast.success("Temple added successfully");
        fetchAllTemples();
        setAddOpen(false);
        setAddData({ templeName: "", address: "", descriptions: "" });
        setAddImage(null);
        setAddImagePreview("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add temple");
    } finally {
      setAddLoading(false);
    }
  };

  // ✅ Open Edit Modal
  const openEditModal = (temple: Temple) => {
    setEditId(temple.id);
    console.log("++++++++++temple", temple);
    setEditData({
      templeName: temple.templeName,
      address: temple.address,
      descriptions: temple.descriptions,
    });
    setEditImagePreview(temple.image);
    setEditOpen(true);
  };

  // ✅ Handle Edit Image
  const handleEditFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImage(file);
    const reader = new FileReader();
    reader.onload = () => setEditImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ✅ Handle Update Temple
  const handleUpdateTemple = async () => {
    if (!editId) return;

  
    try {
      setEditLoading(true);
      const formData = new FormData();
      formData.append("templeName", editData.templeName);
      formData.append("address", editData.address);
      formData.append("descriptions", editData.descriptions);

      console.log(formData.getAll("templeName"));
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/update-temple/${editId}`,
        {
          templeName: editData.templeName,
          address: editData.address,
          descriptions: editData.descriptions,
        }
      );

      if (res.data.status === 200) {
        toast.success("Temple updated successfully");
        fetchAllTemples();
        setEditOpen(false);
        setEditId(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update temple");
    } finally {
      setEditLoading(false);
    }
  };

  // ✅ Handle Delete Temple
  const handleConfirmDelete = async (id: string) => {
    try {
      setDeleteLoadingId(id);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/delete-temple/${id}`
      );
      if (res.data.status === 200) {
        toast.success("Temple deleted successfully");
        setTemples((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete temple");
    } finally {
      setDeleteLoadingId(null);
      setDeleteOpenId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Temple Management</h1>

      {/* Add Button */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogTrigger asChild>
          <Button className="mb-5 flex items-center gap-2">
            <Plus size={16} /> Add Temple
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Temple</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3 py-4">
            <Input
              placeholder="Temple Name"
              value={addData.templeName}
              onChange={(e) =>
                setAddData({ ...addData, templeName: e.target.value })
              }
            />
            <Input
              placeholder="Address"
              value={addData.address}
              onChange={(e) =>
                setAddData({ ...addData, address: e.target.value })
              }
            />
            <Textarea
              placeholder="Description"
              value={addData.descriptions}
              onChange={(e) =>
                setAddData({ ...addData, descriptions: e.target.value })
              }
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleAddFileChange}
            />
            {addImagePreview ? (
              <img
                src={addImagePreview}
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <div className="h-48 bg-gray-100 rounded flex justify-center items-center text-gray-500">
                No image selected
              </div>
            )}
          </div>

          <DialogFooter>
            <Button disabled={addLoading} onClick={handleAddTemple}>
              {addLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {addLoading ? "Adding..." : "Add Temple"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Temple Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {temples.map((temple) => (
          <div
            key={temple.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={temple.image}
              alt={temple.templeName}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold">{temple.templeName}</h2>
              <p className="text-sm text-gray-600">{temple.address}</p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {temple.descriptions}
              </p>
              <div className="mt-3 flex justify-end gap-2">
                {/* Edit Modal */}
                <Dialog
                  open={editOpen && editId === temple.id}
                  onOpenChange={(v) => {
                    if (!v) setEditOpen(false);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => openEditModal(temple)}
                    >
                      <Edit size={16} />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Edit Temple</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-3 py-4">
                      <Input
                        placeholder="Temple Name"
                        value={editData.templeName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            templeName: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Address"
                        value={editData.address}
                        onChange={(e) =>
                          setEditData({ ...editData, address: e.target.value })
                        }
                      />
                      <Textarea
                        placeholder="Description"
                        value={editData.descriptions}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            descriptions: e.target.value,
                          })
                        }
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleEditFileChange}
                      />
                      {editImagePreview ? (
                        <img
                          src={editImagePreview}
                          className="w-full h-48 object-cover rounded"
                        />
                      ) : (
                        <div className="h-48 bg-gray-100 rounded flex justify-center items-center text-gray-500">
                          No image selected
                        </div>
                      )}
                    </div>

                    <DialogFooter>
                      <Button
                        disabled={editLoading}
                        onClick={handleUpdateTemple}
                      >
                        {editLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {editLoading ? "Updating..." : "Update Temple"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Delete Modal */}
                <Dialog
                  open={deleteOpenId === temple.id}
                  onOpenChange={(v) => setDeleteOpenId(v ? temple.id : null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => setDeleteOpenId(temple.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Delete Temple?</DialogTitle>
                    </DialogHeader>

                    <p>
                      Are you sure you want to delete "{temple.templeName}"?
                    </p>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setDeleteOpenId(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={deleteLoadingId === temple.id}
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleConfirmDelete(temple.id)}
                      >
                        {deleteLoadingId === temple.id ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
