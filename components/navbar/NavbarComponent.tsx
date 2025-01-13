"use client";
import React, { useState } from "react";
import { NavMenulist } from "@/components/navbar/NavbarMenu";
import { Heart, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { EventMenulist } from "./sub-navbar/EventMenu";
import { AboutMenulist } from "./sub-navbar/AboutMenu";
import { ContributorMenulist } from "./sub-navbar/ContributorMenu";
import { NavMenuType } from "@/difinitions/types/components-type/NavMenuType";
import { MobileSubmenu } from "./sub-navbar/mobile-sub-nav";
import { MobileMenu } from "./mobile-navbar";
import DesktopNavbar from "./desktop-navbar";
import Image from "next/image";
import logo from "@/public/logo/logodesign no background.png";
import { Button } from "../ui/button";
import ThemeSwitch from "../theme/ThemeSwitches";
import { ProfileDropdown } from "./profile/profile-dropdown";
import { signOut, useSession } from "next-auth/react";

export default function NavbarComponent() {
  const [menuList] = useState<NavMenuType[]>(NavMenulist);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuItems, setSubmenuItems] = useState<NavMenuType[]>([]);

  const router = useRouter();
  const { data: session, status } = useSession();

  if (
    pathname === "/auth/login" ||
    pathname === "/auth/sign-up" ||
    pathname === "/auth/verification"
  ) {
    return null;
  }

  if (isMobileMenuOpen) {
    return activeSubmenu ? (
      <MobileSubmenu
        activeSubmenu={activeSubmenu}
        submenuItems={submenuItems}
        isMobileMenuOpen={isMobileMenuOpen}
        onClose={() => {
          setActiveSubmenu(null);
          setIsMobileMenuOpen(false);
        }}
        onBack={() => setActiveSubmenu(null)}
      />
    ) : (
      <MobileMenu
        // activeSubmenu={activeSubmenu}
        setActiveSubmenu={setActiveSubmenu}
        setSubmenuItems={setSubmenuItems}
        // submenuItems={submenuItems}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuList}
        eventMenulist={EventMenulist}
        contributorMenulist={ContributorMenulist}
        aboutMenulist={AboutMenulist}
      />
    );
  }

  return (
    <nav className="w-full h-[72px] flex items-center justify-between shadow-sm z-10 top-0 px-4 xl:px-10  2xl:px-[80px] dark:border-b">
      <section
        className="flex items-center cursor-pointer px-2"
        onClick={() => router.push("/")}
      >
        <Image
          src={logo}
          width={70}
          height={70}
          alt=""
          className=" xl:w-full xl:h-full"
        />
        <span className="text-medium-eng xl:text-title-eng text-iDonate-navy-primary font-medium dark:text-iDonate-navy-accent  ">
          iDONATE
        </span>
      </section>

      {/* Mobile Menu Button */}
      <Button
        className="lg:hidden bg-transparent text-iDonate-gray hover:bg-iDonate-light-gray hover:text-iDonate-navy-primary rounded-[12px] dark:text-iDonate-white-space dark:hover:bg-iDonate-dark-mode"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-10 h-10" />
      </Button>

      <DesktopNavbar
        menuItems={menuList}
        eventMenulist={EventMenulist}
        contributorMenulist={ContributorMenulist}
        aboutMenulist={AboutMenulist}
      />

      {/* Desktop Sign In & Donate */}
      <section className="hidden lg:flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <div className="py-2">
            <div>
              <ThemeSwitch />
            </div>
          </div>

          <div className="flex items-center">
            {status === "authenticated" ? (
              <ProfileDropdown session={session} signOut={signOut} />
            ) : (
              <Button
                onClick={() => {
                  router.push("/auth/login");
                }}
                className="bg-transparent text-iDonate-navy-primary hover:bg-iDonate-light-gray font-medium dark:text-iDonate-navy-accent dark:hover:bg-iDonate-dark-mode"
              >
                Sign in
              </Button>
            )}
          </div>
        </div>

        <Button className="group bg-iDonate-white-space border-2 border-iDonate-navy-primary px-2 text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white hover:border-iDonate-navy-primary rounded-[12px] dark:text-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:border-transparent">
          <Heart
            style={{ width: "25px", height: "25px" }}
            className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary group-hover:bg-iDonate-green-secondary dark:bg-iDonate-green-secondary  dark:text-iDonate-navy-primary dark:fill-iDonate-navy-primary"
          />
          <span className="text-sub-description-eng xl:text-description-eng">
            Donate Now
          </span>
        </Button>
      </section>

    </nav>
  );
}
