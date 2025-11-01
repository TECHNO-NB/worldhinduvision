"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logo from "../../../public/logo2.jpg";
import banner from "../../../public/logo3.jpg";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Ngo {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
}

export default function HinduNGOsPage() {
  const [ngos, setNgos] = useState<Ngo[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Fetch NGOs from backend API
  const fetchNgos = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-all-ngos`
      );
      setNgos(res.data.data || []);
    } catch (error) {
      console.error("Error fetching NGOs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNgos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100 text-amber-900">
      {/* Hero Section */}
      <header className="relative w-full h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src={banner}
          alt="Hindu NGOs Banner"
          fill
          className="object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <Image
            src={logo}
            alt="World Hindu Vision Logo"
            width={90}
            height={90}
            className="mx-auto rounded-full shadow-lg border-2 border-white mb-3"
          />
          <h1 className="text-4xl font-bold drop-shadow-md">
            Hindu NGOs & Seva Organizations
          </h1>
          <p className="text-lg text-amber-100 mt-2">
            Empowering the world through selfless service and dharmic values
          </p>
        </div>
      </header>

      {/* NGOs List */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-extrabold text-amber-800 mb-4">
          Featured Dharmic Organizations
        </h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
          These NGOs embody the spirit of “Seva Parmo Dharma” — selfless service
          as the highest form of duty.
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-10 text-gray-700">
            <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Loading NGOs...
          </div>
        ) : ngos.length === 0 ? (
          <p className="text-gray-600">No NGOs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ngos.map((ngo) => (
              <Card
                key={ngo.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] transition-all duration-300 border border-amber-200"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={ngo.image}
                    alt={ngo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-5 text-left">
                  <h3 className="text-xl font-bold text-amber-800 mb-1">
                    {ngo.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {ngo.location}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {ngo.description}
                  </p>
                  <Button className="bg-amber-700 hover:bg-amber-800 text-white rounded-full px-4 py-2 text-sm transition">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-white/80 py-16 text-center backdrop-blur-md border-t border-amber-200">
        <h2 className="text-3xl font-bold text-amber-800 mb-4">
          Join Hands in Seva
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Be part of a movement spreading light, compassion, and service across
          the globe. Every small act of kindness contributes to a larger
          transformation.
        </p>
        <Button
          onClick={() => router.push("/volunteer-register")}
          className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg shadow-lg transition"
        >
          Become a Volunteer
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-amber-200 text-gray-700 bg-gradient-to-b from-amber-50 to-yellow-100">
        <p>© 2009 World Hindu Vision. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
