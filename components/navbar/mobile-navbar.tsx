import { ChevronRight, Heart, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { DropdownMenu } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import ThemeSwitch from "../theme/ThemeSwitches";
import { ProfileDropdown } from "./profile/profile-dropdown";
import { useState } from "react";
import { NavMenuType } from "@/difinitions/types/components-type/NavMenuType";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import logo from "@/public/logo/logodesign no background.png";
import Link from "next/link";

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
  const [menuList] = useState<NavMenuType[]>(menuItems);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubmenuClick = (title: string) => {
    setActiveSubmenu(title);
    switch (title) {
      case "Events":
        setSubmenuItems(eventMenulist);
        break;
      case "Contributors":
        setSubmenuItems(contributorMenulist);
        break;
      case "About":
        setSubmenuItems(aboutMenulist);
        break;
      default:
        setSubmenuItems([]);
    }
  };

  const navActiveClass = (isActive: boolean) =>
    `text-md xl:text-description-eng font-normal ${
      isActive ? "text-iDonate-green-primary" : "text-iDonate-navy-primary"
    }`;

  if (!isOpen) return null;

  return (
    <nav className="w-full h-20 self-start lg:hidden flex items-center justify-between shadow-sm z-10">
      <div className="fixed inset-0 bg-white z-50 lg:hidden">
        {/* Header */}

        <div className="w-full h-[72px] flex items-center justify-between shadow-sm px-4">
          <section
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={logo} width={80} height={80} alt="Logo" />
            <span className="text-lg font-medium text-iDonate-navy-primary">
              iDONATE
            </span>
          </section>

          <div className="flex gap-1">
            {/* mode */}

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ThemeSwitch />
                </DropdownMenuTrigger>
              </DropdownMenu>
              {status === "authenticated" ? (
                <ProfileDropdown session={session} signOut={signOut} />
              ) : (
                <Button
                  onClick={() => {
                    router.push("/auth/login");
                    onClose();
                  }}
                  className="hidden sm:flex bg-transparent text-iDonate-navy-primary hover:bg-iDonate-light-gray font-medium"
                >
                  Sign In
                </Button>
              )}
            </div>

            <Button
              onClick={onClose}
              className="bg-iDonate-white-space text-iDonate-gray hover:bg-iDonate-light-gray hover:text-iDonate-navy-primary rounded-lg"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col p-4 gap-4 bg-iDonate-light-gray shadow-light">
          <div className="flex flex-col gap-2">
            {menuList.map((item, index) => {
              const hasSubmenu = ["Events", "Contributors", "About"].includes(
                item.title,
              );
              const specialPaths = ["/how-it-works", "/search"];

              if (specialPaths.includes(item.path)) {
                return (
                  <div key={index}>
                    <Link
                      href={item.path}
                      onClick={onClose}
                      className="flex items-center justify-between w-full h-12 px-4 hover:bg-iDonate-white-space rounded-lg"
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
                    <Button
                      onClick={() => handleSubmenuClick(item.title)}
                      className="flex items-center justify-between w-full h-12 px-4 bg-transparent hover:bg-iDonate-white-space"
                    >
                      <span className={navActiveClass(pathname === item.path)}>
                        {item.title}
                      </span>
                      <ChevronRight className="w-5 h-5 text-iDonate-navy-primary" />
                    </Button>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={onClose}
                      className={`px-4 py-2 rounded-lg ${navActiveClass(pathname === item.path)}`}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {status === "authenticated" && (
            <div className="pt-4 border-t border-gray-300">
              <Button
                onClick={() => signOut()}
                className="w-full py-2 text-red-600 rounded-lg hover:bg-red-50"
              >
                Sign Out
              </Button>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => {
                router.push("/auth/login");
                onClose();
              }}
              className="sm:hidden flex-1 items-center justify-center space-x-2 bg-iDonate-white-space border-2 border-iDonate-navy-primary text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white rounded-lg"
            >
              Sign In
            </Button>

            <Button className="flex-1 items-center justify-center space-x-2 bg-iDonate-white-space border-2 border-iDonate-navy-primary text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white rounded-lg">
              <Heart className="w-5 h-5" />
              <span>Donate Now</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
