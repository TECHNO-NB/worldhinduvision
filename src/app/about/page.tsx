"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, HeartHandshake, Users, Bird } from "lucide-react";
import logo from "../../../public/logo3.jpg";
import logo1 from "../../../public/logo2.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100 text-amber-900">
      {/* Header Section */}
      <header className="text-center py-10 border-amber-200 flex flex-col items-center gap-0">
        <div className="flex items-center justify-center gap-3">
          <Image
            src={logo1}
            alt="logo"
            width={60}
            height={60}
            className="rounded-full border-2 border-amber-600 shadow-md"
            priority
          />
          <h1 className="text-4xl font-bold text-amber-800 tracking-wide">
            About World Hindu Vision
          </h1>
        </div>
      </header>

      {/* About Section */}
      <main className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="rounded-3xl overflow-hidden border-4 border-amber-200 shadow-xl w-full max-w-md">
            <Image
              src={logo}
              alt="World Hindu Vision"
              width={600}
              height={400}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Text */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-amber-800">
            Over 25 Years of Working for Peace and Harmony
          </h2>
          <p className="text-gray-700 leading-relaxed">
            World Hindu Vision
            (WHV) is a globally recognised, volunteer-driven organisation
            dedicated to uniting Hindus worldwide and contributing to global
            welfare. Established 26 years ago, WHV serves as a bridge between
            communities, fostering spiritual awareness, cultural pride,
            education, and humanitarian service. We believe that true strength
            comes from unity and compassion — that by sharing the values of
            Sanatana Dharma, we uplift not only ourselves but all of humanity.
            Core Values: • Dharma — Living with righteousness and integrity •
            Seva — Serving humanity selflessly • Ekta — Uniting all under one
            spiritual vision • Shanti — Promoting peace within and beyond
          </p>

          <Button className="w-fit mt-4 bg-amber-700 hover:bg-amber-800 text-white rounded-lg">
            Learn More
          </Button>
        </div>
      </main>

      {/* Values Section */}
      <section className="py-20 bg-white/70 backdrop-blur-md border-t border-amber-200 mt-16">
        <h2 className="text-center text-3xl font-bold text-amber-800 mb-12">
          Our Core Values
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {[
            {
              icon: <Sun className="w-10 h-10 text-amber-700" />,
              title: "Dharma (Righteousness)",
              desc: "Living with righteousness, truth, and moral responsibility.",
            },
            {
              icon: <HeartHandshake className="w-10 h-10 text-amber-700" />,
              title: "Seva (Selfless Service)",
              desc: "Serving humanity selflessly as a path of devotion and compassion.",
            },
            {
              icon: <Users className="w-10 h-10 text-amber-700" />,
              title: "Ekta (Unity)",
              desc: "Promoting unity, cooperation, and shared identity among Hindus.",
            },
            {
              icon: <Bird className="w-10 h-10 text-amber-700" />,
              title: "Shanti (Peace)",
              desc: "Spreading peace through understanding, harmony, and mindfulness.",
            },
          ].map((value) => (
            <Card
              key={value.title}
              className="border-none bg-gradient-to-br from-amber-50 to-yellow-100 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 rounded-3xl"
            >
              <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                <div className="p-4 bg-amber-100 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-amber-800">
                  {value.title}
                </h3>
                <p className="text-gray-700 text-sm">{value.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-amber-200 text-gray-700">
        <p>© 2025 World Hindu Vision. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
