"use client";
/* eslint-disable */

import { usePathname } from "next/navigation";

import { useEffect } from "react";
import MainNav from "./MainNav";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/admin");

  useEffect(() => {}, [pathname]);

  return (
    <>
      {!hideLayout  && <MainNav />}
      {children}
    </>
  );
}
