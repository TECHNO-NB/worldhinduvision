"use client";
import React from "react";
import Image from "next/image";
import heroImage from "../../public/logo3.jpg";
import { Button } from "./ui/button";
import WelcomePage from "./WelcomePage";
import VisionPage from "@/app/vision/page";
import KeyPrograms from "./KeyPrograms";
import GlobalCommunity from "./GlobalCommunity";
import EventsAndNews from "./EventsAndNews";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import Impact from "./Impact";
import JoinMisson from "./JoinMisson";
import GalleryPage from "./GalleryPage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Promation from "./Promation";

const WorldHinduVision: React.FC = () => {
  const router=useRouter()
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
            {/* Works as before */}
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition-all hover:scale-105">
              <Link href="#jointhemisson">Join The Movement</Link>
            </Button>

            {/* NEW — Smooth Scroll to Vision Section */}
            <Button
              onClick={() => router.push("/vision")}
              className="border-2 border-orange-400 text-orange-300 hover:bg-orange-500 hover:text-white font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition-all hover:scale-105"
            >
              Our Global Mission
            </Button>

            <Button onClick={()=>router.push("/donate")} className="bg-white text-[#800000] hover:bg-orange-100 font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition-all hover:scale-105">
              Donate / Support
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section id="welcome">
        <WelcomePage />
      </section>

      {/* ✅ Make sure this section ID matches */}
      <section id="vision">
        <VisionPage />
      </section>

      {/* Other Sections */}
      <section id="keyprograms">
        <KeyPrograms />
      </section>

      <section id="impact">
        <Impact />
      </section>

      <section id="gallery">
        <GalleryPage />
      </section>

      <section id="globalCommunity">
        <GlobalCommunity />
      </section>

      <section id="EventAndNews">
        <EventsAndNews />
      </section>

      <section id="jointhemisson">
        <JoinMisson />
      </section>


        <section id="contact">
        <Promation />
      </section>
      
      <section id="contact">
        <ContactSection />
      </section>

      

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default WorldHinduVision;
