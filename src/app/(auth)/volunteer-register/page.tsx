"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../public/logo2.jpg";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    photo: null as File | null,
  });

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("address", formData.address);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (formData.photo) data.append("avatar", formData.photo);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/register-volunteer`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Volunteer registration successful!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 px-4 py-10">
      <div className="bg-white/90 backdrop-blur-2xl border border-amber-200 shadow-2xl rounded-2xl w-full max-w-sm p-8 flex flex-col items-center gap-5 h-fit">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            alt="Temple Logo"
            height={80}
            width={80}
            className="rounded-full shadow-md border-2 border-amber-600"
          />
          <h1 className=" text-2xl md:text-3xl font-bold mt-4 text-amber-800">
            Volunteer Registration
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Join us in serving the temple community.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4 w-full mt-4" onSubmit={handleRegister}>
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
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

          {/* Stylish File Upload */}
          <div className="w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-amber-600 rounded-xl cursor-pointer bg-amber-50 hover:bg-amber-100 transition"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={120}
                  height={120}
                  className="object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="flex flex-col items-center text-amber-700">
                  <UploadCloud size={28} />
                  <p className="text-sm font-medium mt-2">
                    Click to upload your photo
                  </p>
                  <p className="text-xs text-gray-500">
                    (JPG, PNG up to 2MB)
                  </p>
                </div>
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

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
            className="bg-amber-700 cursor-pointer hover:bg-amber-800 mt-8 text-white font-semibold py-2 rounded-lg transition-transform active:scale-95 shadow-md flex justify-center items-center gap-2"
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
            className="text-sm text-amber-800 hover:text-amber-900 cursor-pointer text-center mt-1"
          >
            Already have an account? Login
          </p>
          <p
            onClick={() => router.push("/register")}
            className="text-sm text-amber-800 hover:text-amber-900 cursor-pointer text-center mt-1"
          >
            Register as a user instead?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
