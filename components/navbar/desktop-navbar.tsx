"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import SubNavbarComponent from "./sub-navbar/SubNavbartComponent";
import { NavMenuType } from "@/difinitions/types/components-type/NavMenuType";

type DesktopMenuProps = {
  menuItems: NavMenuType[];
  eventMenulist: NavMenuType[];
  contributorMenulist: NavMenuType[];
  aboutMenulist: NavMenuType[];
};

export default function DesktopNavbar({
  menuItems,
  eventMenulist,
  contributorMenulist,
  aboutMenulist,
}: DesktopMenuProps) {
  const pathname = usePathname();

  const navActiveClass = (isActive: boolean) =>
    `text-md xl:text-description-eng font-normal ${
      isActive ? "text-iDonate-green-primary" : "text-iDonate-navy-primary"
    }`;

  if (
    pathname === "/auth/login" ||
    pathname === "/auth/sign-up" ||
    pathname === "/auth/verification"
  ) {
    return null;
  }

  return (
    <Menubar className="border-0 hidden lg:flex space-x-2 xl:space-x-4 bg-transparent dark:text-white">
      {/* Desktop menu code remains the same */}
      {menuItems.map((item, index) => {
        const isActive = pathname === item.path;
        const specialPaths = ["/how-it-works", "/search"];

        return (
          <MenubarMenu key={index}>
            {specialPaths.includes(item.path) ? (
              <Link href={item.path} passHref>
                <div className="h-10 flex items-center space-x-1 py-1 px-3 rounded-lg hover:bg-iDonate-light-gray">
                  {item.path === "/search" && (
                    <Search
                      className={`w-5 h-5 mx-1 ${navActiveClass(isActive)}`}
                    />
                  )}
                  <span className={navActiveClass(isActive)}>{item.title}</span>
                </div>
              </Link>
            ) : (
              <section>
                <MenubarTrigger className="flex items-center px-3 py-1 rounded-lg  hover:bg-iDonate-light-gray bg-transparent">
                  <span className={navActiveClass(isActive)}>{item.title}</span>
                </MenubarTrigger>

                <MenubarContent className="p-4 bg-iDonate-white-space rounded-lg shadow-lg">
                  {item.title === "Events" && (
                    <SubNavbarComponent menuList={eventMenulist} />
                  )}
                  {item.title === "Contributors" && (
                    <SubNavbarComponent menuList={contributorMenulist} />
                  )}
                  {item.title === "About" && (
                    <SubNavbarComponent menuList={aboutMenulist} />
                  )}
                </MenubarContent>
              </section>
            )}
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
}
