"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from "../../../public/logo2.jpg";
import img from "../../../public/logo3.jpg";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 text-amber-900">
      {/* Header Section */}
      <header className="text-center py-12 border-b border-amber-200 flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-3">
          <Image
            src={logo}
            alt="World Hindu Vision"
            width={60}
            height={60}
            className="rounded-full border-2 border-amber-600 shadow-lg md:object-cover"
          />
          <h1 className="text-2xl md:text-4xl font-bold text-amber-800 tracking-wide">
            Our Vision And Mission
          </h1>
        </div>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          "To unite the global Hindu community under one vision of Dharma, Seva,
          and Harmony, promoting universal values of peace, compassion, and
          coexistence."
        </p>
      </header>

      {/* Vision Statement */}
      <section className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 flex justify-center">
          <div className="rounded-3xl overflow-hidden border-4 border-amber-200 shadow-xl w-full max-w-md">
            <Image
              src={img}
              alt="Hindu Vision Symbolism"
              width={600}
              height={400}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-amber-800">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            <ol className=" list-disc">
              <li>
                {" "}
                To build bridges of understanding between communities.
              </li>
              <li>
               To inspire youth and women through education, leadership, and empowerment.
              </li>{" "}
            
              <li>
             To preserve and promote the timeless wisdom of Sanatana Dharma.
              </li>
              <li>
              To serve humanity through sustainable and compassionate action.
              </li>
            </ol>
          </p>

          <Button className="w-fit mt-4 bg-amber-700 hover:bg-amber-800 text-white rounded-lg">
            Join the Mission
          </Button>
        </div>
      </section>

      {/* Guiding Principles */}
      {/* <section className="bg-white/80 py-16 backdrop-blur-md">
        <h2 className="text-center text-3xl font-bold text-amber-800 mb-10">
          Guiding Principles
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {[
            {
              icon: "🌞",
              title: "Universal Harmony",
              desc: "Promoting respect for all faiths and unity through shared spiritual values.",
            },
            {
              icon: "📚",
              title: "Knowledge & Education",
              desc: "Spreading the light of Vedic wisdom through global learning platforms.",
            },
            {
              icon: "🙏",
              title: "Service to Humanity",
              desc: "Encouraging seva (selfless service) as a path to spiritual and social upliftment.",
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-xl font-semibold text-amber-800">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Call to Action */}
      {/* <section className="py-20 text-center bg-gradient-to-r from-amber-100 via-orange-50 to-yellow-50">
        <h2 className="text-3xl font-bold text-amber-800 mb-4">
          Be a Part of the Vision
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Together, we can revive and share the timeless wisdom of Sanatan Dharma,
          bringing light, love, and balance to the modern world.
        </p>
        <Button className="bg-amber-700 hover:bg-amber-800 text-white rounded-lg px-6 py-3 shadow-md">
          Get Involved
        </Button>
      </section> */}

      {/* Footer */}
      {/* <footer className="text-center py-8 border-t border-amber-200 text-gray-700">
        <p>© 2025 World Hindu Vision. All Rights Reserved.</p>
      </footer> */}
    </div>
  );
}
