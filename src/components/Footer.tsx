"use client";

import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-700">
          <Link href="/about" className="hover:text-orange-600 transition">
            About
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <Link href="/programs" className="hover:text-orange-600 transition">
            Programs
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <Link href="/events" className="hover:text-orange-600 transition">
            Events
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <Link href="/contact" className="hover:text-orange-600 transition">
            Contact
          </Link>
        </div>

        {/* Legal Info */}
        <div className="text-center md:text-right text-sm text-gray-600">
          <p>© 2025 World Hindu Vision. All rights reserved.</p>
          <div className="flex items-center justify-center md:justify-end gap-3 mt-1">
            <Link
              href="/privacy-policy"
              className="hover:text-orange-600 transition"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              href="/terms"
              className="hover:text-orange-600 transition"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
