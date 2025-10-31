"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../public/logo2.jpg";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber:"" ,
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/register`, formData); // replace with your API
      toast.success("Registration Successful! You can now login.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 px-4 py-10">
      <div className="bg-white/90 backdrop-blur-4xl border border-amber-200 shadow-2xl rounded-2xl w-full max-w-sm p-8 flex flex-col items-center gap-5 h-fit">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            alt="Temple Logo"
            height={80}
            width={80}
            className="rounded-full shadow-md border-2 border-amber-600"
          />
          <h1 className="text-3xl font-bold mt-4 text-amber-800">Register</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back! Please register to continue.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4 w-full mt-4" onSubmit={handleRegister}>
          <Input
            type="text"
            name="fullName"
            placeholder="Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border-amber-800 focus:border-amber-500 focus:ring-amber-500"
          />
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border-amber-800 focus:border-amber-500 focus:ring-amber-500"
          />
          <Input
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border-amber-800 focus:border-amber-500 focus:ring-amber-500"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-amber-800 focus:border-amber-500 focus:ring-amber-500"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border-amber-800 focus:border-amber-500 focus:ring-amber-500"
          />

          <Button
            type="submit"
            disabled={loading}
            className="bg-amber-700 cursor-pointer hover:bg-amber-800 mt-10 text-white font-semibold py-2 rounded-lg transition-transform active:scale-95 shadow-md flex justify-center items-center gap-2"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Register"
            )}
          </Button>

          <p
            onClick={() => router.push("/login")}
            className="text-sm text-amber-800  hover:text-amber-900 cursor-pointer text-center mt-1"
          >
            Login
          </p>
          <p
            onClick={() => router.push("/volunteer-register")}
            className="text-sm text-amber-800 hover:text-amber-900 cursor-pointer text-center mt-1"
          >
            Register as volunteer ?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
