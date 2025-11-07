"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

interface TemplePageProps {
  params: { id: string };
}

export default function Page({ params }: TemplePageProps) {
  const [temple, setTemple] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Always scroll to top when page loads
    window.scrollTo({ top: 0, behavior: "smooth" });

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
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
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
    <div className="min-h-screen w-full  bg-gradient-to-b from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-10">
      <div className=" w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 hover:shadow-indigo-200 transition-all duration-300">
        <div className="grid md:grid-cols-2">
          {/* Left Image Section */}
          <div className="relative h-[400px] md:h-[650px]">
            <Image
              src={temple.image}
              alt={temple.templeName}
              fill
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Right Content Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              {temple.templeName}
            </h1>

            <p className="text-indigo-600 font-semibold text-lg mb-5">
              📍 {temple.address}
            </p>

            <p className="text-gray-600 leading-relaxed mb-8 text-justify">
              {temple.descriptions}
            </p>

            <Link
              href="/temples"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              ← Back to Temples
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
