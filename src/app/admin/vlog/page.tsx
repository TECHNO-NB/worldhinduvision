"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Video, ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface Vlog {
  id: string;
  title: string;
  description?: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export default function AdminVlogPage() {
  const [vlogs, setVlogs] = useState<Vlog[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mediaType: "IMAGE",
    file: null as File | null,
  });

  // Fetch all vlogs
  const fetchVlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-all-vlog`);
    const data = await res.json();
    if (data.success) setVlogs(data.data);
  };

  useEffect(() => {
    fetchVlogs();
  }, []);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, file });
  };

  // Create vlog (admin upload)
  const handleSubmit = async () => {
    if (!formData.file || !formData.title) {
      toast.error("Please fill all required fields");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("mediaType", formData.mediaType);
    form.append("file", formData.file);

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/upload-vlog`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      console.log(data)
      if (data.success) {
        toast.success("Vlog uploaded successfully!");
        setIsDialogOpen(false);
        setFormData({ title: "", description: "", mediaType: "IMAGE", file: null });
        fetchVlogs();
      } else {
        toast.error(data.message || "Failed to upload vlog");
      }
    } catch (error) {
      toast.error("Server error while uploading vlog");
    } finally {
      setLoading(false);
    }
  };

  // Delete vlog
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vlog?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/delete-vlog/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Vlog deleted successfully");
        setVlogs(vlogs.filter((v) => v.id !== id));
      } else {
        toast.error(data.message || "Failed to delete vlog");
      }
    } catch {
      toast.error("Server error while deleting vlog");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Vlog Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Vlog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Vlog</DialogTitle>
            </DialogHeader>

            <div className="space-y-3 mt-3">
              <Input
                name="title"
                placeholder="Vlog Title"
                value={formData.title}
                onChange={handleChange}
              />
              <Textarea
                name="description"
                placeholder="Vlog Description"
                value={formData.description}
                onChange={handleChange}
              />
              <div className="flex gap-4 items-center">
                <label className="text-sm font-medium">Media Type:</label>
                <select
                  className="border rounded-md p-2"
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={(e) =>
                    setFormData({ ...formData, mediaType: e.target.value })
                  }
                >
                  <option value="IMAGE">Image</option>
                  <option value="VIDEO">Video</option>
                </select>
              </div>
              <Input type="file" accept="image/*,video/*" onChange={handleFileChange} />
            </div>

            <DialogFooter className="mt-4">
              <Button disabled={loading} onClick={handleSubmit}>
                {loading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Vlog List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vlogs.map((vlog) => (
          <Card key={vlog.id} className="relative group overflow-hidden">
            <CardContent className="p-0">
              {vlog.mediaType === "IMAGE" ? (
                <img
                  src={vlog.mediaUrl}
                  alt={vlog.title}
                  className="h-52 w-full object-cover"
                />
              ) : (
                <video
                  controls
                  src={vlog.mediaUrl}
                  className="h-52 w-full object-cover"
                />
              )}
              <div className="p-3 space-y-1">
                <h3 className="font-semibold">{vlog.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {vlog.description}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(vlog.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(vlog.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
