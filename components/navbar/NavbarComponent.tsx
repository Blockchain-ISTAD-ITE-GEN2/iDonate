"use client";
import React, { useEffect, useState } from "react";
import { NavMenulist } from "@/components/navbar/NavbarMenu";
import Link from "next/link";
import {
  Heart,
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  User,
  LogOut,
} from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SubNavbarComponent from "./sub-navbar/SubNavbartComponent";
import { EventMenulist } from "./sub-navbar/EventMenu";
import { AboutMenulist } from "./sub-navbar/AboutMenu";
import { ContributorMenulist } from "./sub-navbar/ContributorMenu";
import { NavMenuType } from "@/difinitions/types/components-type/NavMenuType";
import { signOut, useSession } from "next-auth/react";
import ThemeSwitch from "../theme/ThemeSwitches";
import logo from "@/public/logo/logodesign no background.png";

const ProfileDropdown = ({
  session,
  signOut,
}: {
  session: any;
  signOut: any;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={`${session.user.name ?? "User"}'s avatar`}
            width={40}
            height={40}
            className="rounded-full border-2 border-iDonate-navy-primary"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-iDonate-navy-primary flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-2">
        {/* User Info */}
        <div className="p-3">
          <div className="flex items-center space-x-3">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={`${session.user.name ?? "User"}'s avatar`}
                width={40}
                height={40}
                className="rounded-full border-2 border-iDonate-navy-primary"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-iDonate-navy-primary flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
            )}
            <div className="text-sm">
              <div className="font-medium text-gray-900">
                {session?.user?.name || "Guest User"}
              </div>
              <div className="text-gray-500">
                {session?.user?.email || "No email"}
              </div>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <User className="text-iDonate-navy-primary" size={20} />
            <span>Profile Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/donations"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Heart className="text-iDonate-navy-primary" size={20} />
            <span>My Donations</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/search"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Search className="text-iDonate-navy-primary" size={20} />
            <span>Search</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Donate Button */}
        <div className="p-2">
          <Button className="w-full group bg-iDonate-white-space border-2 border-iDonate-navy-primary px-2 text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white hover:border-iDonate-navy-primary rounded-[12px]">
            <Heart
              style={{ width: "25px", height: "25px" }}
              className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary group-hover:bg-iDonate-green-secondary"
            />
            <span className="text-lg">Donate Now</span>
          </Button>
        </div>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function NavbarComponent() {
  const [menuList] = useState<NavMenuType[]>(NavMenulist);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuItems, setSubmenuItems] = useState<NavMenuType[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const navActiveClass = (isActive: boolean) =>
    `text-description-eng font-normal ${
      isActive ? "text-iDonate-green-primary" : "text-iDonate-navy-primary"
    }`;

  const handleSubmenuClick = (title: string) => {
    setActiveSubmenu(title);
    switch (title) {
      case "Events":
        setSubmenuItems(EventMenulist);
        break;
      case "Contributors":
        setSubmenuItems(ContributorMenulist);
        break;
      case "About":
        setSubmenuItems(AboutMenulist);
        break;
      default:
        setSubmenuItems([]);
    }
  };

  if (
    pathname === "/auth/login" ||
    pathname === "/auth/sign-up" ||
    pathname === "/auth/verification"
  ) {
    return null;
  }

  const MobileSubmenu = () => (
    <div className="fixed inset-0 bg-white z-50 lg:hidden">
      <div className="p-4 flex justify-between items-center border-b bg-white ">
        <button
          onClick={() => setActiveSubmenu(null)}
          className="flex items-center space-x-2 text-iDonate-navy-primary "
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Menu</span>
        </button>
        <button
          onClick={() => {
            setActiveSubmenu(null);
            setIsMobileMenuOpen(false);
          }}
          className="p-2 rounded-lg"
        >
          <X className="w-6 h-6 text-iDonate-navy-primary " />
        </button>
      </div>
      <div className="p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-iDonate-navy-primary ml-1">
          {activeSubmenu}
        </h2>
        <div className="space-y-3 bg-white ">
          {submenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => {
                setActiveSubmenu(null);
                setIsMobileMenuOpen(false);
              }}
              className="block py-2 px-3 rounded-lg hover:bg-iDonate-navy-accent"
            >
              <span className={navActiveClass(pathname === item.path)}>
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const MobileMenu = () => (
    <div className="fixed inset-0 bg-white z-50 lg:hidden">
      <div className="p-4 flex justify-between items-center border-b bg-white ">
        <div className="flex items-center space-x-2 bg-white ">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg"
          >
            <X className="w-6 h-6 text-iDonate-navy-primary" />
          </button>
          <Image src={logo} width={80} height={80} alt="" />
          {/* <div className="w-8 h-8 bg-iDonate-green-primary rounded-full"></div> */}
          <span className="text-lg dark:text-white text-iDonate-navy-primary">
            iDonate
          </span>
        </div>

        <div className="flex items-center space-x-">
          <div className="py-2">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ThemeSwitch />
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center">
            {status === "authenticated" ? (
              <ProfileDropdown session={session} signOut={signOut} />
            ) : (
              <button
                onClick={() => {
                  router.push("/auth/login");
                  setIsMobileMenuOpen(false);
                }}
                className="text-iDonate-navy-primary px-3 py-2 rounded-lg"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 bg-white">
        <div className="relative px-2">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="space-y-4">
          {menuList.map((item, index) => {
            const hasSubmenu = ["Events", "Contributors", "About"].includes(
              item.title,
            );
            const specialPaths = ["/how-it-works", "/search"];

            if (specialPaths.includes(item.path)) {
              return (
                <div key={index} className="py-0">
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full py-2 px-3 rounded-lg"
                  >
                    <span className={navActiveClass(pathname === item.path)}>
                      {item.title}
                    </span>
                    {item.path === "/search" && (
                      <Search className="w-5 h-5 text-iDonate-navy-primary" />
                    )}
                  </Link>
                </div>
              );
            }

            return (
              <div key={index} className="py-2">
                {hasSubmenu ? (
                  <button
                    onClick={() => handleSubmenuClick(item.title)}
                    className="flex items-center justify-between w-full py-0 px-3 rounded-lg "
                  >
                    <span className={navActiveClass(pathname === item.path)}>
                      {item.title}
                    </span>
                    <ChevronRight className="w-5 h-5 text-iDonate-navy-primary" />
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={navActiveClass(pathname === item.path)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {status === "authenticated" && (
          <div className="pt-4 border-t">
            <button
              onClick={() => signOut()}
              className="w-full py-2 px-4 text-red-600 rounded-lg hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        )}

        <div className="pt-2 pb-2 px-2 py-2">
          <Button className="w-full group bg-iDonate-white-space border-2 border-iDonate-navy-primary px-2 text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white hover:border-iDonate-navy-primary rounded-[12px]">
            <Heart
              style={{ width: "25px", height: "25px" }}
              className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary group-hover:bg-iDonate-green-secondary"
            />
            <span className="text-lg">Donate Now</span>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="w-full h-[72px] flex items-center justify-between shadow-sm z-10 top-0 px-4 md:px-8 lg:px-[100px] border border-none ">
      {/* Rest of the navbar code remains the same */}
      {/* Logo and Name */}
      <section
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={logo} width={80} height={80} alt="" />
        <span className="text-lg lg:text-title-eng text-iDonate-navy-primary font-medium">
          iDONATE
        </span>
      </section>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 "
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu and Submenu */}
      {isMobileMenuOpen && (activeSubmenu ? <MobileSubmenu /> : <MobileMenu />)}

      {/* Desktop Navigation Menu */}
      <Menubar className="border-0 hidden lg:flex space-x-4 bg-transparent dark:text-white">
        {/* Desktop menu code remains the same */}
        {menuList.map((item, index) => {
          const isActive = pathname === item.path;
          const specialPaths = ["/how-it-works", "/search"];

          return (
            <MenubarMenu key={index}>
              {specialPaths.includes(item.path) ? (
                <Link href={item.path} passHref>
                  <div className="flex items-center space-x-1 py-1 px-3 rounded-lg hover:bg-iDonate-light-gray">
                    {item.path === "/search" && (
                      <Search
                        className={`w-5 h-5 mx-1 ${navActiveClass(isActive)}`}
                      />
                    )}
                    <span className={navActiveClass(isActive)}>
                      {item.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <section>
                  <MenubarTrigger className="flex items-center px-3 py-1 rounded-lg hover:bg-iDonate-light-gray bg-transparent">
                    <span className={navActiveClass(isActive)}>
                      {item.title}
                    </span>
                  </MenubarTrigger>

                  <MenubarContent className="p-4 bg-iDonate-white-space rounded-lg shadow-lg">
                    {item.title === "Events" && (
                      <SubNavbarComponent menuList={EventMenulist} />
                    )}
                    {item.title === "Contributors" && (
                      <SubNavbarComponent menuList={ContributorMenulist} />
                    )}
                    {item.title === "About" && (
                      <SubNavbarComponent menuList={AboutMenulist} />
                    )}
                  </MenubarContent>
                </section>
              )}
            </MenubarMenu>
          );
        })}
      </Menubar>

      {/* Desktop Sign In & Donate */}
      <section className="hidden lg:flex items-center space-x-4">
        {/* Desktop actions code remains the same */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ThemeSwitch />
          </DropdownMenuTrigger>
        </DropdownMenu>

        {status === "authenticated" ? (
          <div className="flex items-center space-x-4 text-iDonate-navy-secondary ">
            {session?.user?.image && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    src={session.user.image}
                    alt={`${session.user.name ?? "User"}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-iDonate-navy-primary"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span
              className="text-description-eng font-normal text-iDonate-navy-primary cursor-pointer dark:text-iDonate-navy-accent"
              onClick={() => router.push("/auth/login")}
            >
              Sign In
            </span>
          </div>
        )}

        <Button className="group bg-iDonate-white-space border-2 border-iDonate-navy-primary px-2 text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white hover:border-iDonate-navy-primary rounded-[12px] ">
          <Heart
            style={{ width: "25px", height: "25px" }}
            className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary group-hover:bg-iDonate-green-secondary"
          />
          <span className="text-lg">Donate Now</span>
        </Button>
      </section>
    </nav>
  );
}
