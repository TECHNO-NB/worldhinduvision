"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Vlog {
  id: string;
  title: string;
  description?: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export default function VlogDetailsPage() {
  const { id } = useParams();
  const [vlog, setVlog] = useState<Vlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVlogDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-one-vlog/${id}`
        );
        const data = await res.json();
        if (data.success) {
          setVlog(data.data);
        }
      } catch (error) {
        console.error("Error fetching vlog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVlogDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-slate-600">
        Loading vlog details...
      </main>
    );
  }

  if (!vlog) {
    return (
      <main className="min-h-screen flex items-center justify-center text-slate-600">
        Vlog not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-yellow-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <Badge
            variant="outline"
            className="px-3 py-1 text-orange-700 border-orange-300 bg-orange-100"
          >
            Vlog Detail
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3">{vlog.title}</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mt-2">
            <CalendarDays className="w-4 h-4" />
            {new Date(vlog.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Media */}
        <Card className="overflow-hidden shadow-md">
          <div className="relative w-full h-[400px] bg-black">
            {vlog.mediaType === "VIDEO" ? (
              <video
                src={vlog.mediaUrl}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={vlog.mediaUrl}
                alt={vlog.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <CardContent className="p-6 space-y-4">
            <p className="text-lg text-slate-700 leading-relaxed">
              {vlog.description || "No description provided."}
            </p>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatar.jpg" alt="Admin" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-slate-500">
                    Published on {new Date(vlog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => history.back()}
                variant="outline"
                className="text-orange-600 border-orange-400 hover:bg-orange-600 hover:text-white"
              >
                ← Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-10">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-slate-600">
          © 2009 World Hindu Vision · All Rights Reserved
        </div>
      </footer>
    </main>
  );
}
