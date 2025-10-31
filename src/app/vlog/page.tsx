"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Play } from "lucide-react";

export default function WorldHinduVlogPage() {
  const vlogs = [
    {
      title: "Exploring the Kumbh Mela 2025",
      thumbnail: "/vlog1.jpg",
      author: "Ananya Sharma",
      date: "Sept 14, 2025",
      duration: "12:45",
      description: "A journey through the world's largest spiritual gathering — capturing devotion, art, and tradition.",
    },
    {
      title: "Temple Architecture of South India",
      thumbnail: "/vlog2.jpg",
      author: "Ravi Patel",
      date: "Aug 27, 2025",
      duration: "9:30",
      description: "Discover the magnificent Dravidian temples and the science behind their ancient designs.",
    },
    {
      title: "Festivals of Nepal: A Celebration of Unity",
      thumbnail: "/vlog3.jpg",
      author: "Maya Adhikari",
      date: "July 10, 2025",
      duration: "15:20",
      description: "From Dashain to Tihar, explore how faith and family create harmony across the Himalayas.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-yellow-50 text-slate-900">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="World Hindu Vision" width={48} height={48} className="rounded-full" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">World Hindu Vision Vlogs</h1>
            <p className="text-sm text-slate-600">Stories that connect the world through Dharma and culture</p>
          </div>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">Subscribe</Button>
      </header>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="mb-6 inline-block">
          <Badge variant="outline" className="px-3 py-1 text-orange-700 border-orange-300 bg-orange-100">New Episodes Every Week</Badge>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Experience the Spirit of Sanatan Dharma</h2>
        <p className="max-w-2xl mx-auto text-slate-700 mb-8">
          Dive into powerful stories, spiritual journeys, and cultural experiences from around the globe.
        </p>
        <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">Watch Latest Vlog</Button>
      </section>

      {/* Vlog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {vlogs.map((vlog) => (
          <Card key={vlog.title} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
              <Image src={vlog.thumbnail} alt={vlog.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button size="icon" className="rounded-full bg-white/90 hover:bg-orange-600 hover:text-white">
                  <Play className="w-5 h-5" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {vlog.duration}
              </div>
            </div>
            <CardContent className="pt-4 space-y-2">
              <CardTitle className="text-lg font-semibold">{vlog.title}</CardTitle>
              <p className="text-sm text-slate-600 line-clamp-2">{vlog.description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.jpg" alt={vlog.author} />
                  <AvatarFallback>{vlog.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{vlog.author}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <CalendarDays className="w-3 h-3" /> {vlog.date}
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700">Watch</Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-100 to-yellow-100 py-12 mt-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-3">Join the Vision</h3>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            Subscribe for weekly vlogs and cultural insights. Be part of the journey celebrating global Hindu unity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Subscribe Now</Button>
            <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-slate-600">
          © 2025 World Hindu Vision · All Rights Reserved
        </div>
      </footer>
    </main>
  );
}
