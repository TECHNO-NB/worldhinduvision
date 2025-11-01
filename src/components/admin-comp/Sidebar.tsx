"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Calendar,
  ImageIcon,
  HousePlus,

  UserStar,SquarePlay  
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Users", href: "/admin/users", icon: Users, notification: 4 },
    { name: "News & Events", href: "/admin/news", icon: Calendar },
    { name: "Gallery & Highlights", href: "/admin/gallery", icon: ImageIcon },
    { name: "Temples", href: "/admin/temple", icon: HousePlus },
    { name: "Membership", href: "/admin/membership", icon: UserStar  },
    { name: "Vlog", href: "/admin/vlog", icon: SquarePlay   },
     { name: "Ngos", href: "/admin/ngos", icon: Users   },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        WHV Admin
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between p-2 rounded transition
                ${
                  isActive
                    ? "bg-gray-800 text-yellow-400 font-semibold"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
            >
              <div className="flex items-center gap-2">
                <item.icon
                  size={20}
                  className={`${isActive ? "text-yellow-400" : "text-gray-400"}`}
                />
                <span>{item.name}</span>
              </div>

              {/* Notification section */}
              {item.notification && item.notification > 0 && (
                <div className="relative flex items-center">
                  {/* <Bell size={16} className="text-yellow-400" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    {item.notification}
                  </span> */}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
