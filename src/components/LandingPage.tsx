"use client";
import React, { useState } from "react";
import Image from "next/image";
import heroImage from "../../public/logo3.jpg";
import { Button } from "./ui/button";
import WelcomePage from "./WelcomePage";
import VisionPage from "@/app/vision/page";
import KeyPrograms from "./KeyPrograms";
import GlobalCommunity from "./GlobalCommunity";
import EventsAndNews from "./EventsAndNews";
import FounderMessage from "./FounderMessage";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import Impact from "./Impact";
import JoinMisson from "./JoinMisson";
import GalleryPage from "./GalleryPage";
import Link from "next/link";

interface Temple {
  id: number;
  name: string;
  location: string;
  imageAlt: string;
  imageUrl: string;
  description: string;
}

const worldTemples: Temple[] = [
  {
    id: 1,
    name: "Akshardham Temple",
    location: "New Delhi, India",
    imageAlt: "Swaminarayan Akshardham Temple in New Delhi",
    imageUrl:
      "https://tse3.mm.bing.net/th/id/OIP.TYGPpMaynChoMLSVv0aD0wHaFj?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "A spiritual and cultural campus that showcases the essence of India ancient architecture, traditions, and eternal spiritual messages.",
  },
  {
    id: 2,
    name: "BAPS Swaminarayan Mandir",
    location: "London, UK",
    imageAlt: "Neasden Temple in London, UK",
    imageUrl:
      "https://th.bing.com/th/id/R.5ebf2e3da95aa2e77d58cc334608c9b0?rik=lehm%2fckbTb%2fq8w&riu=http%3a%2f%2ftouristinformationcenter.net%2fwp-content%2fuploads%2f2021%2f08%2fBAPS-Shri-Swaminarayan-Mandir-scaled.jpg&ehk=AmSmJGOD3Kah7kO117gPj3hYGmVA4P2K17kJIRbHNn8%3d&risl=&pid=ImgRaw&r=0",
    description:
      "The first traditional Hindu Mandir in Europe, built entirely using ancient methods and materials in the suburbs of London.",
  },
  {
    id: 3,
    name: "Prambanan Temple",
    location: "Central Java, Indonesia",
    imageAlt: "Ancient Hindu temples of Prambanan",
    imageUrl:
      "https://th.bing.com/th/id/R.9ce3b50ae256673c30baafdb07df9a55?rik=OGg5EK7RXRy%2b1A&riu=http%3a%2f%2fwww.thehistoryhub.com%2fwp-content%2fuploads%2f2014%2f08%2fPrambanan-Temple.jpg&ehk=myz1SJBN9XU1ekdTPjqxhX%2bim7ZvRwIG7NQT5xUwmaY%3d&risl=&pid=ImgRaw&r=0",
    description:
      "A spectacular 9th-century Hindu temple complex dedicated to the Trimurti: Brahma, Vishnu, and Shiva, and a UNESCO World Heritage site.",
  },
  {
    id: 4,
    name: "Ranganathaswamy Temple",
    location: "Srirangam, India",
    imageAlt: "Largest functioning Hindu temple in the world",
    imageUrl:
      "https://tse4.mm.bing.net/th/id/OIP.rEWVWTW5HJ8evnPejgvKlgHaG7?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "The largest functioning Hindu temple in the world, dedicated to Ranganatha, a reclining form of the Hindu deity Vishnu.",
  },
];

const WorldHinduVision: React.FC = () => {
  return (
    <div className="font-inter mt-0 bg-gradient-to-b from-amber-50 to-white text-gray-800">
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden"
      >
        <Image
          src={heroImage}
          alt="Hero Background"
          fill
          className="object-cover object-center brightness-50"
          priority
        />
        <div className="relative z-10 px-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg">
            Sanctuary of the World
          </h1>
          <p className="mt-3 text-lg sm:text-2xl font-semibold text-orange-300 tracking-wide">
            “One Vision • One Dharma • One World”
          </p>
          <p className="mt-5 text-lg text-gray-200 max-w-2xl mx-auto">
            Uniting Global Hindus Under One Sacred Tree of Harmony
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition-all hover:scale-105">
              <Link href="#jointhemisson">Join The Movement</Link>
            </Button>
            <Button className="border-2 border-orange-400 text-orange-300 hover:bg-orange-500 hover:text-white font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition-all hover:scale-105">
              Our Global Mission
            </Button>
            <Button className="bg-white text-[#800000] hover:bg-orange-100 font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition-all hover:scale-105">
              Donate / Support
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome section */}
      <section id="welcome">
        <WelcomePage />
      </section>

      {/* Vision And Mission */}
      <section id="vison">
        <VisionPage />
      </section>

      {/* KeyPrograms */}
      <section id="keyprograms">
        <KeyPrograms />
      </section>

      {/* Impact */}
      <section id="impact">
        <Impact />
      </section>

      {/* Gallery */}
      <section id="gallery">
        <GalleryPage />
      </section>

      {/* Global Community  */}
      <section id="globalCommunity">
        <GlobalCommunity />
      </section>

      {/* Event and News  */}
      <section id="EventAndNews">
        <EventsAndNews />
      </section>

      {/* Join the mission */}
      <section id="jointhemisson">
        <JoinMisson />
      </section>

      {/* Contact   */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* Footer   */}
      <section id="footer">
        <Footer />
      </section>

      {/* Temples */}
      {/* <section id="temples" className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-[#800000] mb-3">
            Featured Global Mandirs
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            A curated selection of temples preserving timeless wisdom worldwide.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {worldTemples.map((temple) => (
              <div
                key={temple.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
              >
                <Image
                  src={temple.imageUrl}
                  alt={temple.imageAlt}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />
                <div className="p-5 text-left">
                  <h3 className="text-xl font-bold text-[#800000] mb-2">
                    {temple.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {temple.location}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {temple.description}
                  </p>
                  <button className="bg-[#800000] text-white px-4 py-2 rounded-full text-sm hover:bg-[#a00000] transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      {/* <section className="py-16 bg-gradient-to-r from-[#800000] to-[#b22d00] text-white text-center">
        <h2 className="text-3xl font-extrabold">
          Help Us Preserve and Document Our History
        </h2>
        <p className="mt-3 text-lg opacity-90">
          Your support ensures this global vision thrives.
        </p>
        <button className="mt-6 px-8 py-3 bg-orange-400 hover:bg-orange-500 rounded-full font-semibold text-lg shadow-lg transition">
          Contribute
        </button>
      </section> */}
    </div>
  );
};

export default WorldHinduVision;
