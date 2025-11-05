"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Earth,
  MessageCircle 
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
                <Phone className="w-4 h-4 text-orange-600" /> +1 8255922236
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4 text-orange-600" />
                11809 Sutter Ave, South Ozone Park, NY 11420, United States
              </p>

              {/* WhatsApp Button */}
              <div className="mt-4 flex justify-center md:justify-start ">
                <Link
                  href="https://wa.me/+254117691892"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all">
                    <MessageCircle />  Chat on WhatsApp
                  </Button>
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h1 className="font-bold text-amber-600 mb-2 text-xl">
                Follow Us
              </h1>
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
