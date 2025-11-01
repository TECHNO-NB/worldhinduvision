"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface TemplePageProps {
  params: { id: string };
}

export default function Page({ params }: TemplePageProps) {
  const [temple, setTemple] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTempleDetails = async () => {
      try {
        if (params.id) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/temple-details/${params.id}`
          );
          setTemple(res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTempleDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        Loading temple details...
      </div>
    );
  }

  if (!temple) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        Temple not found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-7xl w-full mb-32 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transition-transform hover:scale-[1.01] duration-300 grid md:grid-cols-2 border border-indigo-100">
        {/* Left Image Section */}
        <div className="relative h-72 md:h-auto">
          <Image
            src={temple.image}
            alt={temple.templeName}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-l-3xl" />
        </div>

        {/* Right Content Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            {temple.templeName}
          </h1>
          <p className="text-indigo-600 font-semibold text-lg mb-5">
            📍 {temple.address}
          </p>
          <p className="text-gray-600 leading-relaxed mb-8 text-justify">
            {temple.descriptions}
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-200 self-start">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
