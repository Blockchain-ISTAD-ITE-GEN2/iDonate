"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export function SearchBar({
  placeholder = "ស្វែងរក",
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Input>) {
  return (
    <form lang={"km"} className="ml-[100px] w-[690px] h-[59px]">
      <label
        htmlFor="default-search"
        className="mb-2 text-[20px]  text-idonate-navy-primary sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <Input
          id="default-search"
          type="search"
          placeholder={placeholder}
          className={cn(
            "ps-10", // Adjust padding-left for the search icon
            className,
          )}
          {...props}
        />
      </div>
    </form>
  );
}
