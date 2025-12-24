"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
const videoUrl = "/video.mp4";

const GlobalCommunity = () => {
  return (
    <section className="px-6 md:px-20 py-4 bg-gradient-to-b from-white to-amber-50 h-fit">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#800000] mb-4">
          Global Community
        </h2>
        <p className="text-lg md:text-xl text-gray-600">
          Connecting Hindus from{" "}
          <span className="font-semibold text-[#800000]">100+ countries</span>
        </p>
      </div>

      <Card className="max-w-5xl mx-auto rounded-2xl shadow-md border-2 border-[#800000]/20 overflow-hidden">
        <CardContent className="p-0">
          <video
            className="w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </CardContent>
      </Card>

      <div className="text-center mt-10">
        <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
          World Hindu Vision unites temples, organizations, and individuals to
          preserve and promote Hindu culture, spirituality, and values across
          the globe.
        </p>
      </div>
    </section>
  );
};

export default GlobalCommunity;
