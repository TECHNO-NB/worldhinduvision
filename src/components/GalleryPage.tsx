"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Globe, Heart, Users, Leaf } from "lucide-react";
import Slider from "react-slick";

// Import slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const iconMap: any = {
  globalconferencesandsummits: <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />,
  humanitarianservicemissions: <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />,
  youthandwomanempowerment: <Users className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />,
  culturalandtemplecelebrations: <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />,
  environmentalandeducationprojects: <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />,
};

type GalleryData = {
  type: string;
  data: { imageUrl: string; id: string; title?: string }[];
};

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState<GalleryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/getall-galleryhighlights`
        );
        setGalleryData(res.data.data);
        console.log("+++++++gallerydata", res.data.data);
      } catch (err) {
        console.error("Error fetching gallery data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-amber-700 text-xl">
        Loading gallery...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-amber-100 text-amber-900">
      {/* Header */}
      <header className="text-center py-10 sm:py-14 border-b border-amber-200 flex flex-col items-center gap-3 sm:gap-4 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-800">
          Gallery & Highlights
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Explore moments of inspiration, service, and devotion from around the world.
        </p>
      </header>

      {/* Gallery Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-14 sm:space-y-20">
        {galleryData.map((section: any) => (
          <div key={section.type} className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 sm:p-3 bg-amber-100 rounded-full flex items-center justify-center">
                {iconMap[section.type]}
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold capitalize text-amber-800">
                {section.type.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </h2>
            </div>

            {/* Section Content */}
            {section.data.length > 3 ? (
              // ✅ Slider for > 3 images
              <div className="mx-[-8px] sm:mx-0">
                <Slider
                  dots={true}
                  infinite={true}
                  slidesToShow={3}
                  slidesToScroll={1}
                  autoplay={true}
                  autoplaySpeed={3000}
                  responsive={[
                    { breakpoint: 1024, settings: { slidesToShow: 2 } },
                    { breakpoint: 640, settings: { slidesToShow: 1 } },
                  ]}
                >
                  {section.data.map((item: any, i: number) => (
                    <div key={i} className="px-2 sm:px-3">
                      <Card className="border-none bg-white/70 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                        <CardContent className="p-0">
                          <Image
                            src={item?.image}
                            alt={item.title || `${section.type} ${i + 1}`}
                            width={400}
                            height={260}
                            className="object-cover w-full h-52 sm:h-60 hover:scale-105 transition-transform duration-300"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              // ✅ Static grid for ≤ 3 images
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {section.data.map((item: any, i: number) => (
                  <Card
                    key={i}
                    className="border-none bg-white/70 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <Image
                        src={item.image}
                        alt={item.title || `${section.type} ${i + 1}`}
                        width={400}
                        height={260}
                        className="object-cover w-full h-52 sm:h-60 hover:scale-105 transition-transform duration-300"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
