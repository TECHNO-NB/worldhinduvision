"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Globe2, Sparkles } from "lucide-react";

type NewsEvent = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  imageUrl?: string;
};

const NewsEvents = () => {
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsAndEvents = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/getall-newsandevents`
        );
        setNewsEvents(res.data.data || []);
      } catch (err) {
        console.error("Error fetching news and events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsAndEvents();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 bg-gradient-to-b from-orange-50 to-white flex justify-center items-center text-orange-600 text-lg">
        Loading News & Events...
      </section>
    );
  }

  if (newsEvents.length === 0) {
    return (
      <section className="w-full py-20 bg-gradient-to-b from-orange-50 to-white text-center">
        <h2 className="text-2xl font-semibold text-gray-700">No News or Events Found</h2>
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <Globe2 className="w-7 h-7 text-orange-600" />
          <h2 className="text-4xl font-bold text-gray-800">News & Events</h2>
        </div>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Stay connected with our latest global initiatives and inspiring movements
          across communities worldwide.
        </p>

        {/* News & Events Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center">
          {newsEvents.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl p-6 flex flex-col items-center justify-center border border-orange-100"
            >
              <Sparkles className="w-6 h-6 text-orange-500 mb-3" />
              <h3 className="font-semibold text-gray-700 text-base text-center mb-2">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
              )}
              <p className="text-xs text-gray-400 mt-0">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
