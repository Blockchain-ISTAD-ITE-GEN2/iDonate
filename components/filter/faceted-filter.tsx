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
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {  useEffect, useState } from "react";

interface FacetedFilterProps {
  title?: string;
  options: {
    label: number | string;
    value: number | string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onFilterChange: (values: (string | number | boolean)[]) => void;
  resetSignal?: number; // Optional signal to reset filters
  defaultValues?: (string | number | boolean)[]; // Pre-selected options
  placeholder?: string; // Custom placeholder text
  sortOptions?: (a: { value: any }, b: { value: any }) => number; // Custom sorting
}

export function FacetedFilter({
  title,
  options,
  onFilterChange,
  resetSignal,
  defaultValues = [],
  placeholder = "Search...",
  sortOptions,
}: FacetedFilterProps) {
  const [selectedValues, setSelectedValues] = useState<
    Set<string | number | boolean>
  >(new Set(defaultValues));

  useEffect(() => {
    setSelectedValues(new Set(defaultValues));
  }, [defaultValues]);

  useEffect(() => {
    setSelectedValues(new Set());
  }, [resetSignal]);

  const toggleSelection = (value: string | number | boolean) => {
    const updatedValues = new Set(selectedValues);
    if (updatedValues.has(value)) {
      updatedValues.delete(value);
    } else {
      updatedValues.add(value);
    }
    setSelectedValues(updatedValues);
    onFilterChange(Array.from(updatedValues));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle />
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
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options
                .sort(sortOptions || ((a, b) => String(a.label).localeCompare(String(b.label))))
                .map((option) => {
                  const isSelected = selectedValues.has(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleSelection(option.value)}
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
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
            </CommandGroup>

            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValues(new Set());
                      onFilterChange([]);
                    }}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
