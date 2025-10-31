"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "../../../public/logo2.jpg";
import banner from "../../../public/logo3.jpg";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields 🙏");
      return;
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100 text-amber-900">
      {/* Hero Section */}
      <header className="relative w-full h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src={banner}
          alt="World Hindu Vision Banner"
          fill
          className="object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white">
          <Image
            src={logo}
            alt="World Hindu Vision Logo"
            width={90}
            height={90}
            className="mx-auto rounded-full shadow-lg border-2 border-white mb-3"
          />
          <h1 className="text-4xl font-bold drop-shadow-md">
            World Hindu Vision
          </h1>
          <p className="text-lg text-amber-100 mt-2">
            Connecting hearts through Dharma, Culture & Service
          </p>
        </div>
      </header>

      {/* Contact Info */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Mail className="w-8 h-8 text-amber-800" />,
            title: "Email Us",
            info: "info@worldhinduvision.org",
          },
          {
            icon: <Phone className="w-8 h-8 text-amber-800" />,
            title: "Call Us",
            info: "+91 98765 43210",
          },
          {
            icon: <MapPin className="w-8 h-8 text-amber-800" />,
            title: "Visit Us",
            info: "Srirangam, Tamil Nadu, India",
          },
        ].map((item) => (
          <Card
            key={item.title}
            className="border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-6 text-center flex flex-col items-center gap-3">
              {item.icon}
              <h3 className="text-xl font-semibold text-amber-800">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">{item.info}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Contact Form */}
      <section className="bg-white/80 py-16 backdrop-blur-md">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">
            Send Us a Message
          </h2>
          <p className="text-gray-700 mb-8">
            Fill out the form below, and we’ll get back to you soon 🙏
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 text-left bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-xl border border-amber-200"
          >
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-amber-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-amber-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full border border-amber-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg text-lg"
            >
              Send Message
            </Button>

            {submitted && (
              <p className="text-green-700 mt-4 text-center font-medium">
                ✅ Thank you for reaching out! We’ll contact you soon.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-amber-200 text-gray-700 bg-gradient-to-b from-amber-50 to-yellow-100">
        <p>© 2025 World Hindu Vision. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
