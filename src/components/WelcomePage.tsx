"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "../../public/logo3.jpg";

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center px-4 md:px-0 py-10">
      <section className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text content */}
          <div className="space-y-5 text-center md:text-left">
            <h1 className="text-3xl sm:text-3xl md:text-5xl font-extrabold leading-tight">
              Welcome to <span className="text-amber-600">World Hindu Vision</span>
            </h1>

            <p className="text-base sm:text-[15px] text-slate-700 leading-relaxed">
             Uniting Hindus. Inspiring Humanity. For over 25 years, World Hindu Vision (WHV) has been
 bringing Hindus together across the globe — promoting peace, culture, and spiritual awakening.
 Rooted in the eternal values of Dharma (righteousness), Seva (selfless service), and Ekta (unity),
 WHV works to build a compassionate, harmonious world where the wisdom of Sanatana Dharma
 guides humanity toward peace and progress. Join the Vision. Be part of the global movement for
 harmony and service.
            </p>

            <Card className="mt-4 shadow-lg border border-amber-100">
              <CardContent className="p-6">
                <h3 className="text-lg md:text-xl font-semibold text-amber-700">What we stand for</h3>
                <ul className="mt-3 space-y-2 text-sm md:text-base text-slate-600 list-disc list-inside">
                  <li>Dharma: living with integrity and moral purpose</li>
                  <li>Peace: fostering harmony in our communities</li>
                  <li>Service: practical action for those in need</li>
                </ul>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button asChild>
                    <a href="#learn" className="inline-block">Learn more</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#join" className="inline-block">Join the movement</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Hero image */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-md border border-amber-100">
              <Image src={heroImage} alt="World Hindu Vision" className="object-cover w-full h-64 md:h-80" />
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center bg-amber-100 rounded-full w-20 h-20 mx-auto">
                <span className="text-2xl font-bold text-amber-700">ॐ</span>
              </div>
              <p className="mt-3 text-slate-600 text-sm md:text-base">
                Rooted in tradition, reaching out with heart.
              </p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <footer className="mt-12 text-center text-sm md:text-base text-slate-500">
          Made with ❤️ — join us to spread dharma, peace & service.
        </footer>
      </section>
    </main>
  );
}
