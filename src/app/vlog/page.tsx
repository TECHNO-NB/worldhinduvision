"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Play } from "lucide-react";
import logo from "../../../public/logo2.jpg"

interface Vlog {
  id: string;
  title: string;
  description?: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export default function WorldHinduVlogPage() {
  const [vlogs, setVlogs] = useState<Vlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-all-vlog`);
        const data = await res.json();
        if (data.success) {
          setVlogs(data.data);
          console.log("DTA OF VLOG",data.data)
        }
      } catch (err) {
        console.error("Failed to fetch vlogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVlogs();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-yellow-50 text-slate-900">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="World Hindu Vision"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">World Hindu Vision Vlogs</h1>
            <p className="text-sm text-slate-600">
              Stories that connect the world through Dharma and culture
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="mb-6 inline-block">
          <Badge
            variant="outline"
            className="px-3 py-1 text-orange-700 border-orange-300 bg-orange-100"
          >
            New Episodes Every Week
          </Badge>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Experience the Spirit of Sanatan Dharma
        </h2>
        <p className="max-w-2xl mx-auto text-slate-700 mb-8">
          Dive into powerful stories, spiritual journeys, and cultural experiences from around
          the globe.
        </p>
      </section>

      {/* Loading or Empty States */}
      {loading ? (
        <p className="text-center text-slate-600 py-20">Loading vlogs...</p>
      ) : vlogs.length === 0 ? (
        <p className="text-center text-slate-600 py-20">
          No vlogs available yet. Please check back later.
        </p>
      ) : (
        /* Vlog Grid */
        <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vlogs.map((vlog) => (
            <Card
              key={vlog.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-48">
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
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                  <Button
                    size="icon"
                    className="rounded-full bg-white/90 hover:bg-orange-600 hover:text-white"
                  >
                    <Play className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <CardContent className="pt-4 space-y-2">
                <CardTitle className="text-lg font-semibold">{vlog.title}</CardTitle>
                <p className="text-sm text-slate-600 line-clamp-2">{vlog.description}</p>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t pt-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.jpg" alt="Admin" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Admin</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <CalendarDays className="w-3 h-3" />{" "}
                      {new Date(vlog.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
                  Watch
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-slate-600">
          © 2009 World Hindu Vision · All Rights Reserved
        </div>
      </footer>
    </main>
  );
}
