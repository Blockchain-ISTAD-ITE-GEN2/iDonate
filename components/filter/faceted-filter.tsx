"use client";

import { Check, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface FacetedFilterProps {
  filters: {
    key: string;
    title: string;
    options: { label: string; value: string }[];
  }[];
  onChange: (selectedFilters: Record<string, string[]>) => void; // Changed to handle multiple selected filters
}

export function FacetedFilter({ filters, onChange }: FacetedFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, Set<string>>>({});

  // Toggle selection for a filter
  const toggleSelection = (filterKey: string, value: string) => {
    const currentSet = selectedFilters[filterKey] || new Set();
    if (currentSet.has(value)) {
      currentSet.delete(value);
    } else {
      currentSet.add(value);
    }
    const newFilters = { ...selectedFilters, [filterKey]: new Set(currentSet) };
    setSelectedFilters(newFilters);
    onChange(
      Object.fromEntries(
        Object.entries(newFilters).map(([key, set]) => [key, Array.from(set)])
      )
    );
  };

  return (
    <div className="space-y-4">
      {filters.map(({ key, title, options }) => {
        const selectedValues = selectedFilters[key] || new Set();

        return (
          <Popover key={key}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                <PlusCircle className="mr-2 h-4 w-4" />
                {title}
                {selectedValues.size > 0 && (
                  <>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal lg:hidden"
                    >
                      {selectedValues.size}
                    </Badge>
                    <div className="hidden space-x-1 lg:flex">
                      {selectedValues.size > 2 ? (
                        <Badge
                          variant="secondary"
                          className="rounded-sm px-1 font-normal"
                        >
                          {selectedValues.size} selected
                        </Badge>
                      ) : (
                        options
                          .filter((option) => selectedValues.has(option.value))
                          .map((option) => (
                            <Badge
                              variant="secondary"
                              key={option.value}
                              className="rounded-sm px-1 font-normal"
                            >
                              {option.label}
                            </Badge>
                          ))
                      )}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Command>
                <CommandInput placeholder={`Search ${title}`} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => {
                      const isSelected = selectedValues.has(option.value);
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => toggleSelection(key, option.value)}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
                            )}
                          >
                            <Check />
                          </div>
                          <span>{option.label}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
}
