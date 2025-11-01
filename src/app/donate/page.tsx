"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import templeImage from "../../../public/logo3.jpg"; // 🛕 Replace with your own image

export default function DonatePage() {
  const [amount, setAmount] = useState<number | string>("");

  const donationTiers = [
    {
      title: "Supporter",
      amount: 50,
      desc: "Help maintain our temple and cultural programs.",
    },
    {
      title: "Devotee",
      amount: 100,
      desc: "Contribute to spiritual education and youth seva.",
    },
    {
      title: "Guardian",
      amount: 250,
      desc: "Support global Sanatan Dharma awareness missions.",
    },
    {
      title: "Guardian",
      amount: 500,
      desc: "Support global Sanatan Dharma awareness missions.",
    },
    {
      title: "Guardian",
      amount: 1000,
      desc: "Support global Sanatan Dharma awareness missions.",
    },
  ];

  const handleDonate = (value: number) => {
    alert(`🙏 Thank you for donating $${value}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100 text-amber-900">
      {/* Header */}
      <header className="text-center py-10 border-b border-amber-200">
        <h1 className="text-4xl font-bold text-amber-800 tracking-wide">
          Donate to World Hindu Vision
        </h1>
        <p className="text-lg text-gray-700 mt-2 max-w-2xl mx-auto">
          Your contribution helps preserve dharma, support education, and spread
          peace.
        </p>
      </header>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Image
          src={templeImage}
          alt="Temple Donation"
          className="rounded-2xl shadow-lg border-4 border-amber-200 w-full object-cover h-[350px]"
        />
      </div>

      {/* Donation Options */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-center text-3xl font-semibold text-amber-800 mb-10">
          Choose a Donation Tier
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {donationTiers.map((tier) => (
            <Card
              key={tier.title}
              className="border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-amber-800 mb-2">
                  {tier.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{tier.desc}</p>
                <div className="text-3xl font-extrabold text-amber-900 mb-4">
                  ${tier.amount}
                </div>
                <Button
                  onClick={() => handleDonate(tier.amount)}
                  className="bg-amber-700 hover:bg-amber-800 text-white rounded-full"
                >
                  Donate Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      
     
      {/* Footer */}
      <footer className="text-center py-8 border-t border-amber-200 text-gray-700">
        <p>© 2009 World Hindu Vision. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
