"use client"
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import React from 'react'
import Image from "next/image";
import logo from "../../public/logo2.jpg";
import Navbar from './Navbar';
import { useRouter } from 'next/navigation';


const MainNav = () => {
  const router=useRouter();
  return (
    <>
     <nav className="w-full sticky top-0 z-50 bg-white  rounded-xl overflow-hidden h-[6vh] md:h-[9vh] px- md:px-10 flex items-center justify-between shadow-sm">
          {/* Logo */}
          <div onClick={()=>router.push("/")} className="logo flex items-center cursor-pointer">
            <Image src={logo} height={80} width={80} alt="logo" className="mb-1" />
          </div>

          {/* Gradient Text */}
          <h1
            className="flex items-center justify-center text-[1.8vh] md:text-[7vh] font-extrabold text-center my-auto 
            bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent"
          >
            World Hindu Vision
          </h1>

          {/* Social Media Icons */}
          <div className="flex items-center gap-2 md:gap-5 text-gray-600">
            <Facebook className="hover:text-blue-600 cursor-pointer transition-all" />
            <Instagram  className="hover:text-pink-500 cursor-pointer transition-all" />
            <Twitter className="hover:text-sky-500 cursor-pointer transition-all" />
            <Youtube className="hover:text-red-600 cursor-pointer transition-all mr-2 md:mr-0" />
          </div>
        </nav>
          <Navbar/>
    </>
  )
}

export default MainNav