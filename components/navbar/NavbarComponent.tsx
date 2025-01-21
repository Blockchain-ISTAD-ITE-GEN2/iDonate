"use client";
import React, { use, useEffect, useState } from "react";
import { NavMenulist } from "@/components/navbar/NavbarMenu";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Heart, LogOut, Search, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
// import { ProfileDropdown } from "./profile/profile-dropdown";
import { signOut, useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import AvartarPlaceHolder from "@/public/images/user-idonate.png";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import toast from "react-hot-toast";
import { getUuidFromToken } from "@/lib/uuid";


export default function NavbarComponent() {
  const [menuList] = useState<NavMenuType[]>(NavMenulist);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuItems, setSubmenuItems] = useState<NavMenuType[]>([]);

  const router = useRouter();
  const { data: session, status } = useSession();
  const accessTokenValue = useAppSelector(selectToken);
  // const {data:userProfile} = useGetUserProfileQuery({});
  // console.log("acessToken value : ",accessTokenValue);
  //the result:acessToken value :  (state)=>state.auth.token
  const { data: userProfile, error, isLoading } = useGetUserProfileQuery({});
  console.log("User Profile: ", userProfile);
  useEffect(() => {}, [accessTokenValue, session]);
  const uuid = getUuidFromToken(accessTokenValue as string);
  // console.log("image of user : ", userProfile?.avatar);

  //  console.log("The value of Token: ",userProfile.email);

  // const handleSignOut = () => {
  //   signOut();

  //   router.push("/");
  // }

  const handleRoutes = (): void => {
    if (session || accessTokenValue) {
      handleLogout();
    } else {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    if (accessTokenValue) {
      fetch(`http://localhost:3000/api/logout`, {
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
            // onClose: () => {
            //   route.refresh();
            // },
          });
        } else {
          console.log("Error ");
        }
      });
    } else {
      // handleLogoutAuth();
    }
  };

  const handleSignOut = () => {
    if (accessTokenValue) {
      fetch(`http://localhost:3000/api/logout`, {
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
    }
  };
  
  useEffect(() => {},[accessTokenValue,session])
  // console.log("User Profile: ",userProfile);

  if (
    pathname === "/login" ||
    pathname === "/sign-up" ||
    pathname === "/verification" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password"
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
        contributorMenulist={ContributorMenulist(uuid as string)}
        aboutMenulist={AboutMenulist}
      />
    );
  }

  return (
    <nav className="w-full h-[72px] flex items-center justify-between shadow-sm z-10 top-0 px-4 xl:px-10  2xl:px-[80px] dark:border-b">
      <section
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src={logo}
          width={80}
          height={80}
          alt=""
          className=" xl:w-full xl:h-full"
        />
        <span className="text-medium-eng xl:text-title-eng text-iDonate-navy-primary font-medium dark:text-iDonate-navy-accent">
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
        contributorMenulist={ContributorMenulist(uuid as string)}
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
            {session || accessTokenValue ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {userProfile? (
                    <Image
                    src={
                      AvartarPlaceHolder ||
                      `https://idonateapi.kangtido.life/media/${userProfile?.avatar}`
                    }

                      alt={`${userProfile?.username ?? "user"}'s avatar`}
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-iDonate-navy-secondary"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-iDonate-navy-primary flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-72 p-2">
                  {/* User Info */}
                  <div className="p-3">
                    <div className="flex items-center space-x-3">   
                      {userProfile? (
                        <Image
                        src={
                          AvartarPlaceHolder ||
                          `https://idonateapi.kangtido.life/media/${userProfile?.avatar}`
                        }

                          alt={`${userProfile?.username ?? "User"}'s avatar`}
                          width={50}
                          height={50}
                          className="rounded-full border-2 border-iDonate-navy-secondary"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-iDonate-navy-primary flex items-center justify-center">
                          <User className="text-white" size={20} />
                        </div>
                      )}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {session?.user?.name ||
                            userProfile?.username ||
                            "Guest User"}
                        </div>
                        <div className="text-gray-500">
                          {session?.user?.email ||
                            userProfile?.email ||
                            "No Email"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  {/* Menu Items */}
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/donor-dashboard/${uuid}`}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <User className="text-iDonate-navy-primary" size={20} />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>

          
                  {/* Sign Out */}
                  <DropdownMenuItem
                    onClick={handleSignOut} // Use handleSignOut instead of signOut directly
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
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
