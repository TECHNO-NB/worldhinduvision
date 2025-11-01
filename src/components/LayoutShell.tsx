"use client";
/* eslint-disable */

import { usePathname } from "next/navigation";
import { Provider } from "react-redux";

import { useEffect } from "react";
import MainNav from "./MainNav";
import { store } from "@/redux/store";
import VerifyUser from "./UserVerify";

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
      <Provider store={store}>
        <VerifyUser />
        {!hideLayout && <MainNav />}
        {children}
      </Provider>
    </>
  );
}
