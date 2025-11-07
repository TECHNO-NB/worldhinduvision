"use client";
/* eslint-disable */
import { addUser } from "@/redux/userSlice";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function VerifyUser() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const userData = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        axios.defaults.withCredentials = true;

        // ✅ Verify login
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/verify-user`
        );

        const fetchedUser = {
          id: data.data.id,
          fullName: data.data.fullName,
          avatar: data.data.avatar ?? "",
          phoneNumber: data.data.phoneNumber,
          email: data.data.email,
          address: data.data.address,
          role: data.data.role,
          forVolunteer: data.data.forVolunteer,
        };

        dispatch(addUser(fetchedUser));

        // ✅ Redirect admin
        if (fetchedUser.role === "admin" && !pathname.startsWith("/admin")) {
          router.push("/admin/users");
        }
      } catch (err) {
        console.error("❌ User verification failed:", err);

        // ✅ Define public routes (regex-supported)
        const publicRoutePatterns = [
          /^\/$/, // Home
          /^\/login$/,
          /^\/register$/,
          /^\/volunteer-register$/,
          /^\/about$/,
          /^\/contact$/,
          /^\/details\/[^/]+$/, // Dynamic details/[id]
          /^\/donate$/,
          /^\/hindunogs$/,
          /^\/membership$/,
          /^\/temples$/,
          /^\/vision$/,
          /^\/vlog$/,
          /^\/vlog-details\/[^/]+$/,
        ];

        // ✅ Check if current route is public
        const isPublic = publicRoutePatterns.some((regex) =>
          regex.test(pathname)
        );

        // ✅ Redirect if not public
        if (!isPublic) {
          router.push("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [pathname, dispatch]);

  if (isLoading) return null;
  return null;
}
