"use client";
/* eslint-disable */
import { addUser } from "@/redux/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function VerifyUser() {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        axios.defaults.withCredentials = true;

        // ✅ Fetch only if not already in Redux
        if (!userData?.id) {
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

          
          if (data.data.role === "admin") {
            // router.push("/admin/users");
          } else {
            // router.push("/");
          }
        }
      } catch (err) {
        console.error("❌ User verification failed:", err);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, router]);

  if (isLoading) {
    return (
      <>
      </>
    );
  }

 
  return null;
}
