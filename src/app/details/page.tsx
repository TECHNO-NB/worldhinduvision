"use client";
import React from "react";
import Image from "next/image";

export default function Page() {
  const temple = {
    id: 4,
    name: "Ranganathaswamy Temple",
    location: "Srirangam, India",
    imageAlt: "Largest functioning Hindu temple in the world",
    imageUrl:
      "https://tse4.mm.bing.net/th/id/OIP.rEWVWTW5HJ8evnPejgvKlgHaG7?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "The largest functioning Hindu temple in the world, dedicated to Ranganatha — a reclining form of the Hindu deity Vishnu. The temple complex covers 156 acres, surrounded by seven concentric walls and 21 gopurams (towers). It is not just a place of worship but a vibrant cultural and architectural marvel that reflects Dravidian heritage.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-5xl w-full mb-32 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transition-transform hover:scale-[1.01] duration-300 grid md:grid-cols-2 border border-indigo-100">
        {/* Left Image Section */}
        <div className="relative h-72 md:h-auto">
          <Image
            src={temple.imageUrl}
            alt={temple.imageAlt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-l-3xl" />
        </div>

        {/* Right Content Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            {temple.name}
          </h1>
          <p className="text-indigo-600 font-semibold text-lg mb-5">
            📍 {temple.location}
          </p>
          <p className="text-gray-600 leading-relaxed mb-8 text-justify">
            {temple.description}
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-200 self-start">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
