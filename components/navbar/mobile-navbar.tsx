import { ChevronRight, Heart, LogOut, Search, User, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThemeSwitch from "../theme/ThemeSwitches";
import { ProfileDropdown } from "./profile/profile-dropdown";
import { useEffect, useState } from "react";
import { NavMenuType } from "@/difinitions/types/components-type/NavMenuType";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import logo from "@/public/logo/logodesign no background.png";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import AvartarPlaceHolder from "@/public/images/user-idonate.png";
import { getUuidFromToken } from "@/lib/uuid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
  const accessTokenValue = useAppSelector(selectToken);
  const { data: userProfile, error, isLoading } = useGetUserProfileQuery({});

  console.log("User Profile", userProfile);
  const uuid = getUuidFromToken(accessTokenValue as string);

  const handleLogoutAuth = (): void => {
    signOut();
  };

  const handleSignOut = () => {
    if (accessTokenValue) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }).then((res) => {
        if (res.ok) {
          toast.success("Logout successful", {
            position: "top-right",
            duration: 3000,
          });
        } else {
          console.log("Error ");
        }
      });
    } else {
      handleLogoutAuth();
    }
  };

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
    `text-md xl:text-description-eng font-normal dark:text-iDonate-navy-accent ${
      isActive ? "text-iDonate-green-primary" : "text-iDonate-navy-primary"
    }`;

  if (!isOpen) return null;

  return (
    <nav className="w-full h-20 self-start lg:hidden flex items-center justify-between shadow-sm z-10">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
        onClick={onClose}
      >
        <div className="w-full h-[72px] flex items-center justify-between shadow-sm px-4 bg-white dark:bg-iDonate-bg-dark-mode">
          <section
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={logo} width={80} height={80} alt="Logo" />
            <span className="text-lg font-medium text-iDonate-navy-primary dark:text-iDonate-navy-accent">
              iDONATE
            </span>
          </section>

          <div className="flex gap-1">
            <div className="flex items-center">
              {session || accessTokenValue ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {userProfile ? (
                      <Image
                        src={
                         
                        `https://idonateapi.kangtido.life/media/${userProfile?.avatar}`
                        ||  AvartarPlaceHolder 
                        }
                        alt={`${userProfile?.username ?? "user"}'s avatar`}
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

                  <DropdownMenuContent className="w-72 p-2 bg-white dark:bg-iDonate-bg-dark-mode">
                    <div className="p-3">
                      <div className="flex items-center space-x-3">
                        {userProfile ? (
                          <Image
                            src={
                              `https://idonateapi.kangtido.life/media/${userProfile?.avatar}`
                              ||   AvartarPlaceHolder 
                            }
                            alt={`${userProfile?.username ?? "User"}'s avatar`}
                            width={50}
                            height={50}
                            className="rounded-full border-2 border-iDonate-navy-primary"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-iDonate-navy-primary flex items-center justify-center">
                            <User className="text-white" size={20} />
                          </div>
                        )}
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {session?.user?.name ||
                              userProfile?.username ||
                              "Guest User"}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {session?.user?.email ||
                              userProfile?.email ||
                              "No Email"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link
                        href={`/donor-dashboard/${uuid}`}
                        className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User
                          className="text-iDonate-navy-primary dark:text-white"
                          size={20}
                        />
                        <span className="dark:text-white">
                          Profile Settings
                        </span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 p-2"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="dark:text-white">Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="bg-transparent text-iDonate-navy-primary hover:bg-iDonate-light-gray font-medium dark:text-iDonate-navy-accent dark:hover:bg-iDonate-dark-mode"
                >
                  Sign in
                </Button>
              )}
            </div>

            <Button
              onClick={onClose}
              className="bg-transparent text-iDonate-gray hover:bg-iDonate-light-gray hover:text-iDonate-navy-primary rounded-lg dark:text-iDonate-white-space dark:hover:bg-iDonate-dark-mode"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col p-4 gap-4 bg-white dark:bg-iDonate-bg-dark-mode shadow-light dark:border-b">
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
                      className="flex items-center justify-between w-full h-12 px-4 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                    >
                      <span className={navActiveClass(pathname === item.path)}>
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
                      className="flex items-center justify-between w-full h-12 px-4 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className={navActiveClass(pathname === item.path)}>
                        {item.title}
                      </span>
                      <ChevronRight className="w-5 h-5 text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
                    </Button>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={onClose}
                      className={`px-4 py-2 rounded-lg ${navActiveClass(pathname === item.path)} hover:bg-gray-100 dark:hover:bg-gray-700`}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {status === "authenticated" && (
            <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
              <Button
                onClick={() => handleSignOut()}
                className="w-full py-2 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900"
              >
                Sign Out
              </Button>
            </div>
          )}

          <div className="flex gap-2">
            {!accessTokenValue && (
              <Button
                onClick={() => {
                  router.push("/login");
                  onClose();
                }}
                className="sm:hidden flex-1 items-center justify-center space-x-2 bg-iDonate-white-space border-2 border-iDonate-navy-primary text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white rounded-lg group px-2 hover:border-iDonate-navy-primary dark:text-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:border-transparent"
              >
                Sign In
              </Button>
            )}

            <Button className="flex-1 items-center justify-center space-x-2 bg-iDonate-navy-primary border-2 border-iDonate-navy-primary text-iDonate-white-space-hovering hover:bg-iDonate-navy-primary hover:text-white rounded-lg dark:text-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:border-transparent">
              <Heart className="w-5 h-5 dark:fill-iDonate-green-primary dark:text-iDonate-green-primary" />
              <span>Donate Now</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
