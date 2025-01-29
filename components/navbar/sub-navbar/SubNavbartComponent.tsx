"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SubNavbarMenuType } from "@/difinitions/types/components-type/SubNavbarMenuType";

type SubNavbarComponentProps = {
  menuList: SubNavbarMenuType[];
};

export default function SubNavbarComponent({
  menuList,
}: SubNavbarComponentProps) {
  const pathname = usePathname();

  const navActiveClass = (isActive: boolean) =>
    `w-[210px] h-[62px] font-normal bg-transparent hover:bg-iDonate-light-gray justify-start px-6 py-4 dark:text-iDonate-navy-accent ${
      isActive ? "text-iDonate-green-primary" : "text-iDonate-navy-primary"
    }`;

  return (
    <section className="flex flex-row ">
      {menuList?.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <div
            key={index}
            className="flex bg-transparent flex-row items-center space-x-1 "
          >
            {item?.children ? (
              <div className=" flex flex-row items-center ">
                <Button
                  className={`${navActiveClass(isActive)} text-lg dark:hover:bg-iDonate-dark-mode`}
                >
                  {/* <item.icon style={{ width: '1.5rem', height: '1.5rem' }} fill="iDonate" /> */}
                  {item.icon && (
                    <item.icon style={{ width: "1.5rem", height: "1.5rem" }} />
                  )}{" "}
                  {/* Render icon if it exists */}
                  {item.title}
                </Button>
              </div>
            ) : (
              <Link href={item.path} passHref>
                <div className="flex flex-row items-center space-x-1 bg-transparent ">
                  <Button
                    className={`${navActiveClass(isActive)}  text-lg dark:hover:bg-iDonate-dark-mode`}
                  >
                    {/* <item.icon style={{ width: '1.5rem', height: '1.5rem' }} /> */}
                    {item.icon && (
                      <item.icon
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      />
                    )}{" "}
                    {/* Render icon if it exists */}
                    {item.title}
                  </Button>
                </div>
              </Link>
            )}
          </div>
        );
      })}
    </section>
  );
}
