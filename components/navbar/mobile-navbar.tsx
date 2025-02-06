"use client";
import { ChevronRight, Heart, LogOut, Search, User, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NavMenuType } from "@/difinitions/types/components-type/NavMenuType";
import { usePathname, useRouter } from "next/navigation";
import {  useSession } from "next-auth/react";
import logo from "@/public/logo/logodesign no background.png";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import { getUuidFromToken } from "@/lib/uuid";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { toast } from "@/hooks/use-toast";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  menuItems: NavMenuType[];
  setActiveSubmenu: (submenu: string | null) => void;
  setSubmenuItems: (items: NavMenuType[]) => void;
  eventMenulist: NavMenuType[];
  contributorMenulist: NavMenuType[];
  aboutMenulist: NavMenuType[];
};

export function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  setActiveSubmenu,
  setSubmenuItems,
  eventMenulist,
  contributorMenulist,
  aboutMenulist,
}: MobileMenuProps) {
  const pathname = usePathname(); // ✅ Hooks should always run
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menuList] = useState<NavMenuType[]>(menuItems);
  const { data: userProfile } = useGetUserProfileQuery({});

  const accessTokenValue = useAppSelector(selectToken);

  useEffect(() => {}, [accessTokenValue, session]);
  const uuid = getUuidFromToken(accessTokenValue as string);
  // ✅ Early return AFTER hooks
  if (!isOpen) return null;

  const handleSubmenuClick = (title: string) => {
    setActiveSubmenu(title);

    let items: NavMenuType[] = [];

    switch (title) {
      case "កម្មវិធីបរិច្ចាគ":
        items = eventMenulist;
        break;
      case "អ្នកចូលរួម":
        items = contributorMenulist;
        break;
      case "អំពីយើង":
        items = aboutMenulist;
        break;
      default:
        items = [];
    }

    setSubmenuItems(items);
    // console.log("Submenu clicked:", title, "Items:", items);
  };

  return (
    <nav className="w-full h-20 self-start lg:hidden flex items-center justify-between shadow-sm z-10">
      <div className="fixed inset-0 bg-transparent z-50 lg:hidden dark:border-b">
        {/* Header */}
        <div className="w-full h-[72px] flex items-center justify-between shadow-sm px-4 dark:border-b">
          <section
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={logo} width={80} height={80} alt="Logo" />
            <span className="hidden sm:block text-medium-eng xl:text-title-eng text-iDonate-navy-primary font-medium dark:text-iDonate-navy-accent">
              iDONATE
            </span>

          </section>

          {/* Theme Mode */}

          <Button
            onClick={onClose}
            className="bg-transparent text-iDonate-gray hover:bg-iDonate-light-gray hover:text-iDonate-navy-primary rounded-lg dark:text-iDonate-white-space dark:hover:bg-iDonate-dark-mode"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
        {/* Menu Content */}
        <div className="flex flex-col p-4 gap-4 bg-iDonate-light-gray dark:bg-iDonate-bg-dark-mode shadow-light dark:border-b">
          <div className="flex flex-col gap-2">
            {menuList.map((item, index) => {
              const hasSubmenu = [
                "កម្មវិធីបរិច្ចាគ",
                "អ្នកចូលរួម",
                "អំពីយើង",
              ].includes(item.title);
              const specialPaths = ["/how-it-works", "/search"];

              if (specialPaths.includes(item.path)) {
                return (
                  <div key={index}>
                    <Link
                      href={item.path}
                      onClick={onClose}
                      className="flex items-center justify-between w-full h-12 px-4 hover:bg-iDonate-white-space rounded-lg dark:hover:bg-iDonate-dark-mode "
                    >
                      <span
                        className={
                          pathname === item.path
                            ? "text-iDonate-green-primary"
                            : "text-iDonate-navy-primary"
                        }
                      >
                        {item.title}
                      </span>
                      {item.path === "/search" && (
                        <Search className="w-5 h-5 text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
                      )}
                    </Link>
                  </div>
                );
              }

              return (
                <div key={index} className="py-2">
                  {hasSubmenu ? (
                    <Button
                      onClick={() => handleSubmenuClick(item.title)}
                      className="flex items-center justify-between w-full h-12 px-4 bg-transparent hover:bg-iDonate-white-space dark:hover:bg-iDonate-dark-mode"
                    >
                      <span
                        className={
                          pathname === item.path
                            ? "text-iDonate-green-primary"
                            : "text-iDonate-navy-primary"
                        }
                      >
                        {item.title}
                      </span>
                      <ChevronRight className="w-5 h-5 text-iDonate-navy-primary  dark:text-iDonate-navy-accent" />
                    </Button>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={onClose}
                      className={`px-4 py-2 rounded-lg ${pathname === item.path ? "text-iDonate-green-primary" : "text-iDonate-navy-primary"}`}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 items-center justify-center space-x-2 bg-iDonate-white-space border-2 border-iDonate-navy-primary text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white rounded-lg dark:text-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:border-transparent">
              <Heart className="w-5 h-5 dark:fill-iDonate-green-primary dark:text-iDonate-green-primary" />
              <span>Donate Now</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
