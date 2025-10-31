"use client";

import React from "react";
import { Button } from "./ui/button";

export default function JoinMisson() {
  return (
    <section className="min-h-fit bg-gradient-to-b from-white to-amber-50 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Join <span className="text-amber-600">The Vision</span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-10">
          Be part of a global movement dedicated to peace, service, and unity.
          Whether you are an individual, temple, organisation, or youth leader —
          your participation matters. Together, we can make a world guided by
          wisdom, compassion, and shared purpose.
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <Button className="bg-amber-600 hover:bg-amber-700 cursor-pointer py-4">
            Become a Member
          </Button>
          <Button>Partner with WHV</Button>
          <Button className="bg-white hover:bg-white/50 text-black border-1 border-black rounded-2xl cursor-pointer">
            Volunteer Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
