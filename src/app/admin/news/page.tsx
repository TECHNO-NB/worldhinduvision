"use client";

import { useEffect, useState } from "react";
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
import { Trash2, Edit, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface NewsEvent {
  id: string;
  title: string;
  eventDate: string;
}

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsEvent[]>([]);
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<NewsEvent | null>(null);

  // fetch news and event
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/getall-newsandevents`
        );
        console.log(res.data.data)
        setNewsList(res.data?.data || []);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load news!");
      }
    };
    fetchNews();
  }, []);

  // ✅ Add or Update News
  const handleAddOrUpdate = async () => {
    if (!title.trim() || !eventDate) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      if (editingId) {
        // Update API call
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/update-news-event/${editingId}`,
          { title, eventDate }
        );
        setNewsList((prev) =>
          prev.map((n) => (n.id === editingId ? res.data?.data : n))
        );
        toast.success("News updated successfully!");
      } else {
        // Add API call
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/create-news-event`,
          { title, eventDate }
        );
        setNewsList((prev) => [...prev, res.data?.data]);
        toast.success("News added successfully!");
      }
      setTitle("");
      setEventDate("");
      setEditingId(null);
      setOpenDialog(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Action failed!");
    }
  };

  // ✅ Prepare edit
  const handleEdit = (news: NewsEvent) => {
    setEditingId(news.id);
    setTitle(news.title);
    setEventDate(news.eventDate);
    setOpenDialog(true);
  };

  // ✅ Delete News (API)
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/delete-news-event/${deleteTarget.id}`
      );
      setNewsList((prev) =>
        prev.filter((n) => n.id !== deleteTarget.id)
      );
      toast.success("News deleted successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete news!");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">News & Events</h1>

      {/* Add or Edit News Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button
            className="mb-4 flex items-center gap-2"
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setEventDate("");
            }}
          >
            <Plus size={16} /> Add News
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit News" : "Add News"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="date"
              placeholder="Event Date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddOrUpdate}>
              {editingId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* News Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2 border text-left">Title</th>
              <th className="p-2 border text-left">Event Date</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news.id} className="hover:bg-gray-50">
                <td className="p-2 border">{news.title}</td>
                <td className="p-2 border">{news.eventDate}</td>
                <td className="p-2 border text-center flex justify-center gap-2">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                    onClick={() => handleEdit(news)}
                  >
                    <Edit size={16} />
                  </Button>

                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                    onClick={() => setDeleteTarget(news)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
            {newsList.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-6 text-gray-500"
                >
                  No news found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete News?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete “{deleteTarget?.title}”? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
