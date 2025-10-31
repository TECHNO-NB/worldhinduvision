"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  // 👇 Add more items if needed for testing pagination
];

export default function TemplesPage() {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(worldTemples);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Filter logic for search
  useEffect(() => {
    if (search === "") {
      setSearchData(worldTemples);
    } else {
      const myTimeout = setTimeout(() => {
        setSearchData(
          worldTemples.filter((val) =>
            val.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      }, 300);
      return () => clearTimeout(myTimeout);
    }
    setCurrentPage(1); // reset to first page when search changes
  }, [search]);

  // Pagination logic
  const totalPages = Math.ceil(searchData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = searchData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100 text-amber-900">
      {/* Header */}
      <header className="text-center py-10 border-b border-amber-200">
        <h1 className="text-4xl font-bold text-[#800000] tracking-wide">
          Featured Global Mandirs
        </h1>
        <p className="text-lg text-gray-700 mt-3 max-w-2xl mx-auto">
          A curated selection of temples preserving timeless wisdom worldwide.
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex items-center justify-center mt-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            value={search}
            placeholder="Search all temples.."
            className="w-[352px] pl-10 border-2 border-[#800000]"
          />
        </div>
      </div>

      {/* Temples Section */}
      <section id="temples" className="py-18">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {currentItems.length <= 0 && <h1>No data found 😰</h1>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentItems.map((temple) => (
              <div
                key={temple.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 border border-amber-100"
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
                  <Button className="bg-[#800000] text-white px-4 py-2 rounded-full text-sm hover:bg-[#a00000] transition">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-10">
              <PaginationContent className="flex justify-center">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePrevious}
                    className={`cursor-pointer ${
                      currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                    }`}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className={`cursor-pointer ${
                        currentPage === i + 1
                          ? "bg-[#800000] text-white"
                          : "hover:bg-amber-100"
                      }`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={handleNext}
                    className={`cursor-pointer ${
                      currentPage === totalPages
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-amber-200 text-gray-700">
        <p>© 2025 World Hindu Vision. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
