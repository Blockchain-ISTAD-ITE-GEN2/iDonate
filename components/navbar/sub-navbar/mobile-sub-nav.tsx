"use client";
import { Button } from "@/components/ui/button";
import { NavMenuType } from "@/difinitions/types/components-type/NavMenuType";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileSubmenuProps = {
  activeSubmenu: string | null;
  submenuItems: NavMenuType[];
  isMobileMenuOpen: boolean;
  onClose: () => void;
  onBack: () => void;
};

export function MobileSubmenu({
  activeSubmenu,
  submenuItems,
  isMobileMenuOpen,
  onClose,
  onBack,
}: MobileSubmenuProps) {
  const pathname = usePathname();

  const navActiveClass = (isActive: boolean) =>
    `text-md xl:text-description-eng font-normal ${
      isActive ? "text-iDonate-green-primary" : "text-iDonate-navy-primary"
    }`;

  if (!isMobileMenuOpen || !activeSubmenu) return null; // Render nothing if submenu is closed or no active submenu

  return (
    <div className="fixed h-20 inset-0 bg-white z-50  lg:hidden">
      <div className="w-full h-[72px] flex items-center justify-between shadow-sm px-4 2xl:px-[100px]">
        {/* Back to main menu button */}
        <Button
          onClick={onBack}
          className="bg-iDonate-white-space text-iDonate-gray hover:bg-iDonate-light-gray hover:text-iDonate-navy-primary rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Menu</span>
        </Button>

        {/* Close button */}
        <Button
          onClick={onClose}
          className="bg-iDonate-white-space text-iDonate-gray hover:bg-iDonate-light-gray hover:text-iDonate-navy-primary rounded-lg"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex flex-col p-4 gap-4 bg-iDonate-light-gray shadow-light">
        <h2 className="text-xl font-semibold text-iDonate-navy-primary">
          {activeSubmenu}
        </h2>
        <div className="flex flex-col gap-2">
          {submenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={onClose}
              className="flex items-center justify-between w-full h-12 px-4 hover:bg-iDonate-white-space rounded-lg"
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
}
