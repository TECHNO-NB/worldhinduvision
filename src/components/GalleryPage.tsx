"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Globe, Heart, Users, Leaf, Book } from "lucide-react";

const galleryItems = [
  {
    category: "Global Conferences & Summits",
    icon: <Globe className="w-8 h-8 text-amber-700" />,
    images: [
      "/gallery/conference1.jpg",
      "/gallery/conference2.jpg",
      "/gallery/conference3.jpg",
    ],
  },
  {
    category: "Humanitarian Service Missions",
    icon: <Heart className="w-8 h-8 text-amber-700" />,
    images: [
      "/gallery/service1.jpg",
      "/gallery/service2.jpg",
      "/gallery/service3.jpg",
    ],
  },
  {
    category: "Youth & Women Empowerment",
    icon: <Users className="w-8 h-8 text-amber-700" />,
    images: [
      "/gallery/empower1.jpg",
      "/gallery/empower2.jpg",
      "/gallery/empower3.jpg",
    ],
  },
  {
    category: "Cultural & Temple Celebrations",
    icon: <Camera className="w-8 h-8 text-amber-700" />,
    images: [
      "/gallery/culture1.jpg",
      "/gallery/culture2.jpg",
      "/gallery/culture3.jpg",
    ],
  },
  {
    category: "Environmental & Educational Projects",
    icon: <Leaf className="w-8 h-8 text-amber-700" />,
    images: [
      "/gallery/eco1.jpg",
      "/gallery/eco2.jpg",
      "/gallery/eco3.jpg",
    ],
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-amber-100 text-amber-900">
      {/* Header */}
      <header className="text-center py-12 border-b border-amber-200 flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-amber-800">Gallery & Highlights</h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Explore moments of inspiration, service, and devotion from around the world.
        </p>
      </header>

      {/* Gallery Sections */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {galleryItems.map((section) => (
          <div key={section.category} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 rounded-full">{section.icon}</div>
              <h2 className="text-2xl font-semibold text-amber-800">
                {section.category}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {section.images.map((img, i) => (
                <Card
                  key={i}
                  className="border-none bg-white/70 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
                >
                  <CardContent className="p-0">
                    <Image
                      src={img}
                      alt={`${section.category} ${i + 1}`}
                      width={400}
                      height={300}
                      className="object-cover w-full h-60 hover:scale-105 transition-transform duration-300"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </main>

    
    </div>
  );
}
