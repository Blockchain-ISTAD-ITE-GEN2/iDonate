"use client";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { DateRangeType } from "@/difinitions/types/filter/filter";

export function DateRangePicker({ filters, onChange }: DateRangeType) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, DateRange | undefined>
  >({});

  const updateDateRange = (key: string, range: DateRange) => {
    // Update the selected date range for the specific filter key
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev, [key]: range };
      const validFilters = Object.fromEntries(
        Object.entries(updatedFilters).filter(
          ([_, value]) => value !== undefined,
        ),
      );
      onChange(validFilters as Record<string, DateRange>); // Notify parent of the change
      return updatedFilters;
    });
  };

  return (
    <div className="space-y-4">
      {filters.map(({ key, title }) => {
        const range = selectedFilters[key];

        return (
          <Popover key={key}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {title}
                {range?.from && range?.to ? (
                  <>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <span>
                      {format(range.from, "LLL dd, y")} -{" "}
                      {format(range.to, "LLL dd, y")}
                    </span>
                  </>
                ) : (
                  <span>Select date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={range}
                onSelect={(range) => range && updateDateRange(key, range)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
}
