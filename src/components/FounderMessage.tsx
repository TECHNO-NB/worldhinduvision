"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const FounderMessage = () => {
  return (
    <section className="w-full bg-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="border-none shadow-sm bg-white/80 backdrop-blur-md">
          <CardContent className="flex flex-col md:flex-row items-center justify-center gap-6 py-8 px-6">
            <div className="flex-shrink-0">
              <Image
                src="https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4388.jpg?w=360"
                alt="Founder"
                width={100}
                height={100}
                className="rounded-full object-cover border-2 border-orange-600"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-700 italic text-lg leading-relaxed">
                “Our roots are ancient, but our vision is global.”
              </p>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                — Full Name founder
              </h3>
              <p className="text-sm text-gray-500">Founder & President</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FounderMessage;
