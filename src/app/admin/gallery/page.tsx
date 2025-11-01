"use client";

import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Edit, Plus, Loader2 } from "lucide-react";

// ✅ Backend enum values mapped to readable labels
const galleryTypeOptions = [
  { label: "Global Conferences & Summits", value: "globalconferencesandsummits" },
  { label: "Humanitarian Service Missions", value: "humanitarianservicemissions" },
  { label: "Youth & Woman Empowerment", value: "youthandwomanempowerment" },
  { label: "Cultural & Temple Celebrations", value: "culturalandtemplecelebrations" },
  { label: "Environmental & Education Projects", value: "environmentalandeducationprojects" },
];

interface Gallery {
  id: string;
  image: string;
  types: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const [addImageFile, setAddImageFile] = useState<File | null>(null);
  const [addImagePreview, setAddImagePreview] = useState<string>("");
  const [addType, setAddType] = useState<string>("globalconferencesandsummits");
  const [addLoading, setAddLoading] = useState(false);

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [editType, setEditType] = useState<string>("globalconferencesandsummits");
  const [editLoading, setEditLoading] = useState(false);

  // Delete modal
  const [deleteOpenId, setDeleteOpenId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ✅ Fetch gallery
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/getall-galleryhighlights`
        );
        setGallery(res.data?.data || []);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load gallery");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // === Add Handlers ===
  const handleAddFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAddImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAddImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else setAddImagePreview("");
  };

  const handleAdd = async () => {
    if (!addImageFile) return toast.error("Please select an image!");

    const formData = new FormData();
    formData.append("imageurl", addImageFile);
    formData.append("types", addType);

    setAddLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/create-gallery-highlights`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setGallery((prev) => [res.data?.data, ...prev]);
      toast.success("Gallery added successfully!");
      setAddImageFile(null);
      setAddImagePreview("");
      setAddType("globalconferencesandsummits");
      setAddOpen(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add gallery!");
    } finally {
      setAddLoading(false);
    }
  };

  // === Edit Handlers ===
  const openEditModal = (item: Gallery) => {
    setEditingId(item.id);
    setEditImagePreview(item.image);
    setEditType(item.types);
    setEditOpen(true);
  };

  const handleEditFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setEditImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setEditImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return toast.error("No item selected!");
    const formData = new FormData();
    if (editImageFile) formData.append("file", editImageFile);
    formData.append("types", editType);

    setEditLoading(true);
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/update-gallery/${editingId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setGallery((prev) =>
        prev.map((g) => (g.id === editingId ? res.data?.data : g))
      );
      toast.success("Gallery updated successfully!");
      setEditOpen(false);
      setEditingId(null);
      setEditImageFile(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update!");
    } finally {
      setEditLoading(false);
    }
  };

  // === Delete Handler ===
  const handleConfirmDelete = async (id: string) => {
    setDeleteLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/delete-gallery/${id}`
      );
      setGallery((prev) => prev.filter((g) => g.id !== id));
      toast.success("Gallery deleted successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete!");
    } finally {
      setDeleteOpenId(null);
      setDeleteLoading(false);
    }
  };

  if (loading)
    return <div className="text-center py-8 text-gray-500">Loading gallery...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gallery & Highlights</h1>

      {/* ADD Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 flex items-center gap-2">
            <Plus size={16} /> Add Gallery
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Gallery</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input type="file" accept="image/*" onChange={handleAddFileChange} />
            {addImagePreview && (
              <img
                src={addImagePreview}
                alt="preview"
                className="w-full h-48 object-cover rounded"
              />
            )}
            <Select value={addType} onValueChange={(val) => setAddType(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {galleryTypeOptions.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button onClick={handleAdd} disabled={addLoading}>
              {addLoading ? <Loader2 className="animate-spin mr-2" /> : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="bg-white rounded shadow overflow-hidden">
            <img
              src={item.image}
              alt={item.types}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 flex items-center justify-between">
              <div className="text-sm font-medium">
                {
                  galleryTypeOptions.find((t) => t.value === item.types)?.label ||
                  item.types
                }
              </div>

              <div className="flex items-center gap-2">
                {/* Edit */}
                <Dialog
                  open={editOpen && editingId === item.id}
                  onOpenChange={(v) => !v && setEditOpen(false)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
                      onClick={() => openEditModal(item)}
                    >
                      <Edit size={16} />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Gallery</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleEditFileChange}
                      />
                      {editImagePreview && (
                        <img
                          src={editImagePreview}
                          alt="edit preview"
                          className="w-full h-48 object-cover rounded"
                        />
                      )}
                      <Select
                        value={editType}
                        onValueChange={(val) => setEditType(val)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {galleryTypeOptions.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleUpdate} disabled={editLoading}>
                        {editLoading ? (
                          <Loader2 className="animate-spin mr-2" />
                        ) : (
                          "Update"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Delete */}
                <Dialog
                  open={deleteOpenId === item.id}
                  onOpenChange={(v) => setDeleteOpenId(v ? item.id : null)}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-red-500 hover:bg-red-600 text-white p-1 rounded">
                      <Trash2 size={16} />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Delete Gallery?</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this gallery item?</p>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setDeleteOpenId(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleConfirmDelete(item.id)}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <Loader2 className="animate-spin mr-2" />
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
