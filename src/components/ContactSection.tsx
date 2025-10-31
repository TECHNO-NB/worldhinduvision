"use client";

import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Twitter, Earth } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const ContactSection = () => {
  return (
    <section className="w-full bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <Card className="border-none shadow-sm bg-white/90 backdrop-blur-sm">
          <CardContent className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 py-6 px-6">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Contact Us
              </h2>
               <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-sm">
                <Earth className="w-4 h-4 text-orange-600" /> www.worldhinduvision.org
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-sm">
                <Mail className="w-4 h-4 text-orange-600" /> info@worldhinduvision.org
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-sm mt-1">
                <Phone className="w-4 h-4 text-orange-600" /> +91-91164 23216
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4 text-orange-600" /> 
                Pashupatinath Marg, New Delhi, India
              </p>
            </div>

            {/* Social Links */}
            <div className="">
             <h1 className="font-bold  text-amber-600  mb-2 text-xl">Follow Us</h1>
            <div className="flex items-center justify-center gap-4">
              <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-gray-700 hover:text-orange-600 transition" />
              </Link>
              <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-gray-700 hover:text-orange-600 transition" />
              </Link>
              <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
                <Youtube className="w-5 h-5 text-gray-700 hover:text-orange-600 transition" />
              </Link>
            
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-gray-700 hover:text-orange-600 transition" />
              </Link>
            </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
