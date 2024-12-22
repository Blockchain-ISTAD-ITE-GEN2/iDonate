"use client";
import React, { useEffect, useState } from "react";
import { NavMenulist } from "@/components/navbar/NavbarMenu";
import Link from "next/link";
import {  Heart, Search } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import SubNavbarComponent from "./sub-navbar/SubNavbartComponent";
import { EventMenulist } from "./sub-navbar/EventMenu";
import { AboutMenulist } from "./sub-navbar/AboutMenu";
import { ContributorMenulist } from "./sub-navbar/ContributorMenu";
import { NavMenuType } from "@/difinitions/types/components-type/NavMenuType";
import {signOut, useSession} from "next-auth/react";

export default function NavbarComponent() {
  const [menuList] = useState<NavMenuType[]>(NavMenulist);
  const pathname = usePathname();
  const router = useRouter();
  const {theme, setTheme } = useTheme()


  // Ensure theme is light by default
  useEffect(() => {
    if (!theme) setTheme("light");
  }, [theme, setTheme]);

  const navActiveClass = (isActive: boolean) =>
    `text-description-eng font-normal ${
      isActive ? "text-iDonate-green-primary" : "text-iDonate-navy-primary"
  }`;
  const { data: session,status } = useSession();

  useEffect(() => {
    console.log("Session:", session);
    console.log("Status:", status);
  }, [session, status]);

  if (pathname === "/auth/login" ||
    pathname === "/auth/sign-up" ||
    pathname === "/auth/verification"){
      return null;
  }
   
  else
    return (
        <nav className="w-full h-[72px] flex items-center justify-between shadow-sm z-10  top-0 px-[100px]">
            {/* Logo and Name */}
            <section
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => router.push("/")}
            >
                 <div className="w-10 h-10 bg-iDonate-green-primary rounded-full"></div>
                <span className="text-title-eng">iDonate</span>
            </section>

            {/* Navigation Menu */}
            <Menubar className="border-0 flex space-x-4 bg-transparent">
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

                                <MenubarContent className="p-4 bg-iDonate-white-space rounded-lg shadow-lg ">
                                    {item.title === "Events" && (
                                            <SubNavbarComponent menuList={EventMenulist} />
                                    )}
                                    {item.title === "Contributors" && (
                                            <SubNavbarComponent menuList={ContributorMenulist} />
                                    )}
                                    {item.title === "About" && (
                                            <SubNavbarComponent menuList={ AboutMenulist} />
                                    )}
                                </MenubarContent>
                            </section>
                        )}

                        </MenubarMenu>
                    );
                })}
            </Menubar>

            {/* Sign In & Donate */}
            <section className="flex items-center space-x-4">

            <Button
                    variant="outline"
                    size="icon"
                    className="bg-iDonate-green-accent hover:bg-iDonate-green-secondary rounded-full border-0 p-2"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

                {status === "authenticated" ? (
                    <div className="flex items-center space-x-4 text-iDonate-navy-secondary">
                        {session?.user?.image && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Image
                                        src={session?.user.image}
                                        alt={`${session?.user.name ?? "User"}'s avatar`}
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
                className="text-description-eng font-normal text-iDonate-navy-primary cursor-pointer"
                onClick={() => router.push("/auth/login")}
            >
              Sign In
            </span>
                    </div>
                )}

                <Button className="group  bg-iDonate-white-space border-2 border-iDonate-navy-primary px-4 text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white hover:border-iDonate-navy-primary rounded-[12px] h-[50px]">
                    <Heart style={{ width: '30px', height: '30px' }} className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary group-hover:bg-iDonate-green-secondary "/>
                    <span className="text-xl ">Donate Now</span>
                </Button>
            </section>
        </nav>
    );
}