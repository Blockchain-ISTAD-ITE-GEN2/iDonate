"use client";
import { useEffect, useState } from "react";
import { NavMenulist } from "@/components/navbar/NavbarMenu";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Heart, LogOut, Search, User } from "lucide-react";
import Link from "next/link";
import { EventMenulist } from "./sub-navbar/EventMenu";
import { AboutMenulist } from "./sub-navbar/AboutMenu";
import { useContributorMenuList } from "./sub-navbar/ContributorMenu";
import { NavMenuType } from "@/difinitions/types/components-type/NavMenuType";
import { MobileSubmenu } from "./sub-navbar/mobile-sub-nav";
import { MobileMenu } from "./mobile-navbar";
import DesktopNavbar from "./desktop-navbar";
import Image from "next/image";
import logo from "@/public/logo/logodesign no background.png";
import { Button } from "../ui/button";
import ThemeSwitch from "../theme/ThemeSwitches";
import { signOut, useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { getUuidFromToken } from "@/lib/uuid";
import { toast } from "@/hooks/use-toast";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

export default function NavbarComponent() {
  const pathname = usePathname(); 
  const [menuList] = useState<NavMenuType[]>(NavMenulist);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuItems, setSubmenuItems] = useState<NavMenuType[]>([]);
  const { data: session } = useSession();
  const accessTokenValue = useAppSelector(selectToken);
  const { data: userProfile } = useGetUserProfileQuery({});
  const router = useRouter();
  const { menuList: contributorList } = useContributorMenuList();


  useEffect(() => {}, [accessTokenValue, session]);
  const uuid = getUuidFromToken(accessTokenValue as string);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  ✅ Early return before using other hooks
  if (
    pathname === "/login" ||
    pathname === "/sign-up" ||
    pathname === "/verification" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/waiting-verification"
  ) {
    return null;
  }

 
  

  const handleLogout = () => {
    //  alert("Logout successful");
    if (accessTokenValue) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }).then((res) => {
        if (res.ok) {
          // alert("Logout successful");
          toast({
            variant: "destructive",
            title: "ចាកចេញបានជោគជ័យ",
            description: "សូមស្វាគមន៍ម្តងទៀត",
          });
          router.refresh();
          router.push("/");
        } else {
          console.log("Error ");
        }
      });
    }
  };

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
        setActiveSubmenu={setActiveSubmenu}
        setSubmenuItems={setSubmenuItems}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuList}
        eventMenulist={EventMenulist}
        contributorMenulist={contributorList}
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
        <span className="hidden sm:block text-medium-eng xl:text-title-eng text-iDonate-navy-primary font-medium dark:text-iDonate-navy-accent">
          iDONATE
        </span>
      </section>

      <div className="flex lg:hidden gap-2 items-center h-12">
        <div className="flex   items-center justify-center w-10 h-10">
          <ThemeSwitch />
        </div>

          <div className="flex   items-center justify-center">
            {accessTokenValue ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="w-10 h-10 cursor-pointer">
                    {userProfile?.avatar ? (
                      <AvatarImage
                        src={userProfile?.avatar}
                        className="object-cover w-full h-full rounded-full ring-2 ring-iDonate-navy-primary"
                        alt={`${userProfile?.username || "User"}'s avatar`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <AvatarFallback className="text-gray-700">
                        {userProfile?.username?.[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-72 p-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      {userProfile?.avatar ? (
                        <AvatarImage
                          width={500}
                          height={500}
                          src={userProfile?.avatar}
                          className="object-cover w-full h-full rounded-full ring-2 ring-iDonate-navy-primary"
                          alt={`${userProfile?.username || "User"}'s avatar`}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <AvatarFallback className="text-gray-700">
                          {userProfile?.username?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {session?.user?.name || userProfile?.username || "Guest User"}
                      </div>
                      <div className="text-gray-500">
                        {session?.user?.email || userProfile?.email || "No Email"}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <Link
                    href={`/donor-dashboard/${uuid}`}
                    className="flex items-center space-x-2 py-2 cursor-pointer hover:bg-gray-100 rounded-md px-2"
                  >
                    <User className="text-iDonate-navy-primary" size={20} />
                    <span>Profile Settings</span>
                  </Link>

                  <Separator className="my-2" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left py-2 rounded-md px-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                onClick={() => {
                  router.push("/login");
                }}
                className="w-28 h-10 bg-transparent text-iDonate-navy-primary hover:bg-iDonate-light-gray font-medium dark:text-iDonate-navy-accent dark:hover:bg-iDonate-dark-mode"
              >
                Sign in
              </Button>
            )}
          </div>

          <Button
            className=" w-10 h-10 bg-transparent text-iDonate-gray hover:bg-iDonate-light-gray hover:text-iDonate-navy-primary rounded-[12px] dark:text-iDonate-white-space dark:hover:bg-iDonate-dark-mode flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>




      <DesktopNavbar
        menuItems={menuList}
        eventMenulist={EventMenulist}
        contributorMenulist={contributorList}
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
            {accessTokenValue ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className=" cursor-pointer">
                    {userProfile?.avatar ? (
                      <AvatarImage
                        width={500}
                        height={500}
                        src={userProfile?.avatar}
                        className="object-cover w-full rounded-full ring-2 h-full ring-iDonate-navy-primary"
                        alt={`${userProfile?.username || "User"}'s avatar`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <AvatarFallback className="text-gray-700">
                        {userProfile?.username?.[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-72 p-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-14 h-14">
                      {userProfile?.avatar ? (
                        <AvatarImage
                          width={500}
                          height={500}
                          src={userProfile?.avatar}
                          className="object-cover w-full rounded-full ring-2 h-full ring-iDonate-navy-primary"
                          alt={`${userProfile?.username || "User"}'s avatar`}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <AvatarFallback className="text-gray-700">
                          {userProfile?.username?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      )}
                    </Avatar>
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

                  <Separator className="my-2" />

                  <Link
                    href={`/donor-dashboard/${uuid}`}
                    className="flex items-center space-x-2 py-2 cursor-pointer hover:bg-gray-100 rounded-md px-2"
                  >
                    <User className="text-iDonate-navy-primary" size={20} />
                    <span>Profile Settings</span>
                  </Link>

                  <Separator className="my-2" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left py-2 rounded-md px-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </PopoverContent>
              </Popover>
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
            បរិច្ចាគឥឡូវនេះ
          </span>
        </Button>
      </section>
    </nav>
  );
}
