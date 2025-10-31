"use client";

import React from "react";
import { Globe2, Sparkles } from "lucide-react";

const initiatives = [
  "WHV Global Summit 2025",
  "Earth Harmony Week",
  "Youth Leadership Forum",
  "Interfaith Harmony Dialogues",
  "Global Education Drive",
];

const NewsEvents = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <Globe2 className="w-7 h-7 text-orange-600" />
          <h2 className="text-4xl font-bold text-gray-800">
            News & Events
          </h2>
        </div>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Stay connected with our latest global initiatives and inspiring movements
          across communities worldwide.
        </p>

        {/* Highlights */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center">
          {initiatives.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl p-6 flex flex-col items-center justify-center border border-orange-100"
            >
              <Sparkles className="w-6 h-6 text-orange-500 mb-3" />
              <h3 className="font-semibold text-gray-700 text-base text-center">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
