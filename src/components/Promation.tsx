"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  GraduationCap, 
  HandHeart, 
  MapPin, 
  Phone, 
  Globe 
} from "lucide-react";

// You can use the images you uploaded previously here
import studentImg from "@/../public/poster.jpeg"; 
import volunteerImg from "@/../public/poster2.jpeg";

export default function Promation() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 py-16 px-6 md:px-12" >
      
      {/* --- HEADER --- */}
      <header className="  sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      
          
          {/* Location Badge */}
          <Badge variant="outline" className="flex items-center gap-1 -z-50 border-red-200 bg-red-50 text-red-700 px-3 py-1">
            <MapPin className="w-3 h-3" />
            <span>Only for Nepal 🇳🇵</span>
          </Badge>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <Badge className="mb-4 bg-yellow-500 text-black hover:bg-yellow-400 border-0 text-sm px-4 py-1">
            Nationwide Programs 2026
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Building a Stronger Nepal Through Education & Service
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
            Select a program below to register or view details. These opportunities are available for citizens across all 7 provinces of Nepal.
          </p>
        </div>
      </section>

      {/* --- SELECTION CARDS --- */}
      <main className="flex-grow container mx-auto px-4 -mt-10 mb-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* --- OPTION 1: SCHOLARSHIP (Student) --- */}
          <Card className="flex flex-col shadow-xl border-0 overflow-hidden group hover:ring-2 hover:ring-blue-500 transition-all">
            <div className="relative h-56 w-full bg-blue-100">
               {/* Image Background */}
               <Image 
                 src={studentImg} 
                 alt="Scholarship Exam" 
                 fill 
                 className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent flex flex-col justify-end p-6">
                 <div className="flex items-center gap-2 text-yellow-400 mb-1">
                    <GraduationCap className="w-6 h-6" />
                    <span className="font-bold tracking-wide uppercase text-sm">Education</span>
                 </div>
                 <h2 className="text-2xl font-bold text-white">Scholarship Exam</h2>
               </div>
            </div>
            
            <CardContent className="flex-grow pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">Grade 5 Students Only</Badge>
                <span className="text-xs text-gray-500 font-medium">Nepal Wide</span>
              </div>
              <p className="text-gray-600">
                A competitive examination to identify and support talented students. Benefits include full scholarships, school fee support, and educational materials.
              </p>
              <ul className="space-y-2 mt-2">
                <FeatureItem text="Exam Date: 25 Jan 2026" />
                <FeatureItem text="Merit & Need-based Selection" />
              </ul>
            </CardContent>

            <Separator />

            <CardFooter className="p-6 grid gap-3">
              <Button 
                onClick={() => window.location.href = "https://scholarship.worldhinduvision.org/register"} 
                className="w-full bg-blue-700 hover:bg-blue-800 text-lg py-6 shadow-md"
              >
                Apply for Scholarship <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "https://scholarship.worldhinduvision.org/info"} 
                className="w-full"
              >
                Read Information
              </Button>
            </CardFooter>
          </Card>


          {/* --- OPTION 2: VOLUNTEER (General) --- */}
          <Card className="flex flex-col shadow-xl border-0 overflow-hidden group hover:ring-2 hover:ring-yellow-500 transition-all">
            <div className="relative h-56 w-full bg-yellow-100">
               {/* Image Background */}
               <Image 
                 src={volunteerImg} 
                 alt="Volunteers" 
                 fill 
                 className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 to-transparent flex flex-col justify-end p-6">
                 <div className="flex items-center gap-2 text-yellow-400 mb-1">
                    <HandHeart className="w-6 h-6" />
                    <span className="font-bold tracking-wide uppercase text-sm">Community</span>
                 </div>
                 <h2 className="text-2xl font-bold text-white">Volunteer Program</h2>
               </div>
            </div>

            <CardContent className="flex-grow pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-yellow-50 text-yellow-800">Open for All Citizens</Badge>
                <span className="text-xs text-gray-500 font-medium">All Provinces</span>
              </div>
              <p className="text-gray-600">
                Join our mission to coordinate educational programs and social services. We are looking for District Coordinators and Social Workers across Nepal.
              </p>
              <ul className="space-y-2 mt-2">
                <FeatureItem text="Coordination Officer Roles" />
                <FeatureItem text="Social Service & Leadership" />
              </ul>
            </CardContent>

            <Separator />

            <CardFooter className="p-6 grid gap-3">
              <Button 
                onClick={() => window.location.href = "https://scholarship.worldhinduvision.org/volunteer-register"} 
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white text-lg py-6 shadow-md"
              >
                Join as Volunteer <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
               onClick={() => window.location.href = "https://scholarship.worldhinduvision.org/volunteer-info"} 
                className="w-full"
              >
                Read Information
              </Button>
            </CardFooter>
          </Card>

        </div>
      </main>

    </div>
  );
}

// Simple Helper Component for Bullet Points
function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-slate-700">
      <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      {text}
    </li>
  );
}