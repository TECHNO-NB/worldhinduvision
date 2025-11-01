"use client";

/* eslint-disable */

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = useSelector((state: any) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!userData || userData.role !== "admin") {
      return router.push("/login");
    }
  }, [userData, router]);

  return <>{children}</>;
}
