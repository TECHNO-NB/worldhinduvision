"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,

} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Ngo {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
}

export default function AdminNgosPage() {
  const [ngos, setNgos] = useState<Ngo[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    image: null as File | null,
  });

  // Fetch all NGOs
  const fetchNgos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-all-ngos`);
      setNgos(res.data.data);
    } catch (error) {
      console.error("Error fetching NGOs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add NGO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) return alert("Please upload an image");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("image", form.image);

    try {
      setUploading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/upload-ngos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ name: "", location: "", description: "", image: null });
      setOpen(false);
      fetchNgos();
    } catch (error) {
      console.error("Error adding NGO:", error);
    } finally {
      setUploading(false);
    }
  };

  // Delete NGO
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this NGO?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/delete-ngos/${id}`);
      fetchNgos();
    } catch (error) {
      console.error("Error deleting NGO:", error);
    }
  };

  useEffect(() => {
    fetchNgos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b  p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold text-amber-800">Admin Panel - NGOs</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-700 hover:bg-amber-800 text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5" /> Add NGO
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg bg-white text-gray-800">
            <DialogHeader>
              <DialogTitle className="text-amber-800 flex items-center gap-2">
                <PlusCircle className="w-5 h-5" /> Add New NGO
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <Input
                placeholder="NGO Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files?.[0] || null })
                }
                required
              />

              <Button
                type="submit"
                className="bg-amber-700 hover:bg-amber-800 text-white w-full"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Add NGO"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* NGOs List */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center text-gray-700">
            <Loader2 className="w-6 h-6 animate-spin inline-block mr-2" />
            Loading NGOs...
          </div>
        ) : ngos.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">
            No NGOs found.
          </p>
        ) : (
          ngos.map((ngo) => (
            <motion.div
              key={ngo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white shadow-lg rounded-2xl overflow-hidden border border-amber-200 hover:shadow-amber-200 transition-all">
                <div className="relative h-48 w-full">
                  <Image
                    src={ngo.image}
                    alt={ngo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-amber-800 mb-1">
                    {ngo.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">📍 {ngo.location}</p>
                  <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                    {ngo.description}
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(ngo.id)}
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
