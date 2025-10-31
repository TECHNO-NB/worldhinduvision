"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, BookOpen, HeartHandshake, Building2, Users, Sparkles } from "lucide-react";

const programs = [
  {
    icon: <Sparkles className="w-10 h-10 text-amber-600" />,
    title: " Community Welfare & Social Support",
    desc: "Supporting families, elders, and individuals in need through humanitarian outreach, disaster relief, and volunteer networks.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-amber-600" />,
    title: "Education & Youth Engagement",
    desc: "Providing value-based education, leadership programs, and cultural workshops to nurture the next generation of global Hindu leaders.",
  },
  {
    icon: <HeartHandshake className="w-10 h-10 text-amber-600" />,
    title: "Women’s Empowerment",
    desc: "Encouraging women’s participation in leadership, entrepreneurship, and spiritual life through empowerment programs and mentoring.",
  },
  {
    icon: <Building2 className="w-10 h-10 text-amber-600" />,
    title: " Environmental Sustainability & Climate Action",
    desc: "Promoting the Vedic principle of “Vasudhaiva Kutumbakam” — caring for the Earth as one family — through green initiatives and climate awareness campaigns.",
  },
  {
    icon: <Users className="w-10 h-10 text-amber-600" />,
    title: "Cultural & Religious Engagement",
    desc: "Organising global festivals, heritage events, and interfaith dialogues to promote cultural understanding and unity.",
  },
  {
    icon: <Globe className="w-10 h-10 text-amber-600" />,
    title: "Global Presence & Collaboration",
    desc: "Working with temples, organisations, and communities in over 100 countries, strengthening the global Hindu network for collective progress and service.",
  },
];

export default function KeyPrograms() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-amber-50 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Our <span className="text-amber-600">Key Initiatives and Contributions</span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-10">
          Discover the core initiatives that bring our mission to life across the world.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border-amber-100 bg-white"
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                {item.icon}
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
