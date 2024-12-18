"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

interface DateFilterProps {
  resetSignal: number;
  onFilterChange: (filterValue: { field: string; from?: string; to?: string } | undefined) => void;
  dateField: string; // Make dateField required
}

export function DateRangePicker({
  resetSignal,
  onFilterChange,
  dateField,
}: DateFilterProps) {
  const [date, setDate] = useState<DateRange | undefined>();

  useEffect(() => {
    if (date?.from || date?.to) {
      onFilterChange({
        field: dateField, // Include the dateField in the filter change callback
        from: date?.from?.toISOString(),
        to: date?.to?.toISOString(),
      });
    } else {
      onFilterChange(undefined); // Clear the filter if no date is selected
    }
  }, [date, onFilterChange, dateField]);

  // Reset the date state when the resetSignal changes
  useEffect(() => {
    setDate(undefined);
  }, [resetSignal]);

  const clearFilters = () => {
    setDate(undefined);
    onFilterChange(undefined);
  };

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            id={dateField} // Use dateField as an identifier if needed
            variant={"outline"}
            className={cn("h-8 w-auto border-dashed justify-start text-left")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto h-auto p-0" align="end">
          <Command className="h-auto">
            <CommandList className="h-auto">
              <CommandGroup>
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </CommandGroup>

              {date?.from && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={clearFilters}
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
    </div>
  );
}
