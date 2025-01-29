"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { OrganizationSidebarMenuList } from "@/components/organization/sidebar/OrganizationSidebarMenu";
import { SubNavbarMenuType } from "@/difinitions/types/components-type/SubNavbarMenuType";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarGroupLabel } from "@/components/ui/sidebar";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";

export default function OrganizationSidebarComponent() {

  const params = useParams();
  const uuid = String(params.uuid); // Ensures `uuid` is a string

  const [menuList] = useState<SubNavbarMenuType[]>(OrganizationSidebarMenuList(uuid));
  const pathname = usePathname();

  const navActiveClass = (isActive: boolean) =>
    `w-[210px] h-[62px] font-normal bg-transparent flex hover:bg-iDonate-light-gray justify-start px-6 py-4 ${
      isActive ? "text-iDonate-green-primary" : "text-iDonate-navy-primary"
    }`;

  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/sign-up" ||
    pathname === "/verification" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/search" ||
    pathname === "/about-us" ||
    pathname === "/categories" ||
    pathname === "/events" ||
    pathname === "/contributors" ||
    pathname === "/mission-vision" ||
    pathname === "/organizations" ||
    pathname === "/how-it-works" ||
    pathname === "/organization-dashboard/create-organization"
  )
    return null;
  else
    return (
      <section className="flex flex-col h-full border-r-2 border-iDonate-navy-accent px-6 py-4 gap-y-3 ">
        {/* Profile of Organization */}

        {/* Menu */}
        <SidebarGroupLabel className="text-sm text-iDonate-gray dark:text-iDonate-navy-accent">
          Oganization
        </SidebarGroupLabel>
        {menuList.map((item, index) => {
          const isActive = pathname === item.path;

          return (
            <Fragment key={index}>
              {item.path && !item.active ? (
                <Button className={`${navActiveClass(isActive)} text-lg`}>
                  <Link key={index} href={item.path} className="flex">
                    {item.icon && (
                      <item.icon
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          marginRight: "0.5rem",
                        }}
                      />
                    )}
                    {item.title}
                  </Link>
                </Button>
              ) : (
                <Button className={`${navActiveClass(isActive)} text-lg`}>
                  {item.icon && (
                    <item.icon
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        marginRight: "0.5rem",
                      }}
                    />
                  )}
                  {item.title}
                </Button>
              )}
              {index === menuList.length - 3 && <Separator className="m-2" />}
            </Fragment>
          );
        })}
      </section>
    );
}
