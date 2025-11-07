"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useRouter } from "next/navigation";

interface Temple {
  id: number;
  name: string;
  location: string;
  imageAlt: string;
  imageUrl: string;
  description: string;
}

export default function TemplesPage() {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [search, setSearch] = useState("");
  const [filteredTemples, setFilteredTemples] = useState<Temple[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-all-temple`
        );
        const data = res.data?.data || [];
        setTemples(data);
        setFilteredTemples(data);
      } catch (err) {
        console.error("Error fetching temples:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemples();
  }, []);

  // ✅ Instant client-side search (filters already fetched data)
  useEffect(() => {
    if (!search.trim()) {
      setFilteredTemples(temples);
    } else {
      const lower = search.toLowerCase();
      setFilteredTemples(
        temples.filter(
          (t: any) =>
            t.templeName.toLowerCase().includes(lower) ||
            t.address.toLowerCase().includes(lower)
        )
      );
    }
    setCurrentPage(1);
  }, [search, temples]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTemples.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredTemples.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-[#800000] text-lg">
        Loading temples...
      </div>
    );
  }

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
      <div className="flex items-center justify-center mt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            value={search}
            placeholder="Search temples..."
            className="w-[350px] pl-10 border-2 border-[#800000]"
          />
        </div>
      </div>

      {/* Temples Section */}
      <section id="temples" className="py-18">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {currentItems.length <= 0 ? (
            <h1 className="text-lg mt-10">No temples found 😰</h1>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {currentItems.map((temple: any) => (
                <div
                  key={temple.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 border border-amber-100"
                >
                  <Image
                    src={temple?.image}
                    alt={temple.templeName}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-5 text-left">
                    <h3 className="text-xl font-bold text-[#800000] mb-2">
                      {temple.templeName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      📍 {temple.address}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                      {temple.descriptions.slice(0, 100)}...
                    </p>
                    <Button
                      onClick={() => router.push(`/details/${temple.id}`)}
                      className="bg-[#800000] text-white px-4 py-2 rounded-full text-sm hover:bg-[#a00000] transition"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

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
        <p>© 2009 World Hindu Vision. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
