"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import logo from "../../public/logo3.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const router = useRouter();
  const pathname = usePathname(); // Track the current path

  const allLink = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Vision", link: "/vision" },
    { title: "Temple", link: "/temples" },
    { title: "Donate", link: "/donate" },
    { title: "Contact", link: "/contact" },
    { title: "Hindu NGOs", link: "/hindungos" },
    { title: "Membership", link: "/membership" },
    { title: "Volunteers Register", link: "/volunteer-register" },
    { title: "Join", link: "/login" },
    { title: "Vlog", link: "/vlog" },
  ];

  // Close menu whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="w-full bg-gradient-to-r from-purple-800 via-yellow-500 to-orange-600 text-white border-t-2 mt-2 relative">
      {/* Menu Toggle Button */}
      <div className="flex justify-end items-center px-4 py-2">
        <button
          className="cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 
        bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-600 
        text-white backdrop-blur-lg shadow-2xl 
        transform transition-transform duration-500 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-5 border-b border-white/30">
          <div className="flex gap-3">
            <Button onClick={()=>router.push("/login")} className="bg-white cursor-pointer text-indigo-700 font-semibold hover:bg-indigo-200 transition-all">
              Login
            </Button>
            <Button onClick={()=>router.push("/register")} className="bg-yellow-400 cursor-pointer text-purple-900 font-semibold hover:bg-yellow-300 transition-all">
              Register
            </Button>
          </div>
          <button className="cursor-pointer" onClick={toggleMenu}>
            <X size={28} />
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col items-start px-8 mt-10 gap-6 text-lg font-semibold">
          {allLink.map((val, i) => (
            <li
              key={i}
              onClick={() => router.push(val.link)}
              className="w-full relative group cursor-pointer transition-all"
            >
              <span className="group-hover:text-yellow-300 transition-all">
                {val.title}
              </span>
              <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-1/2"></div>
            </li>
          ))}
        </ul>

        {/* Footer Decorative Section */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-white/10 border-t border-white/20 text-center text-sm">
          <p className="text-white/80">© 2025 Hindu Heritage Foundation</p>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500"
        ></div>
      )}
    </div>
  );
};

export default Navbar;
