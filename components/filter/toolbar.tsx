"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FacetedFilter } from "./faceted-filter";
import { DateRangePicker } from "./date-range-picker";
import { ChangeEvent, useState } from "react";

interface ToolbarProps {
  searchKey: string; // Key for searching
  onFilterChange: (filters: Record<string, any>) => void; // Callback to send filters to the parent
  filters?: {
    key: string; // Key to identify the filter field
    title: string; // Display title for the filter
    options: { label: string; value: string }[]; // Options for the filter
  }[];
  dateField: string; // Field name for date range filtering
  placeholder?: string; // Optional placeholder for the search bar
  className?: string; // Custom class for the toolbar
}

export function Toolbar({
  searchKey,
  onFilterChange,
  filters = [],
  dateField,
  placeholder,
  className,
}: ToolbarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [resetSignal, setResetSignal] = useState(0);

  const updateFilter = (key: string, value: any) => {
    const updatedFilters = { ...filterValues, [key]: value };
    setFilterValues(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    setSearchValue("");
    setFilterValues({});
    setResetSignal((prev) => prev + 1);
    onFilterChange({});
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    updateFilter(searchKey, value);
  };

  return (
    <div className={className || "flex items-center justify-between"}>
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder || `Search by ${searchKey}`}
          value={searchValue}
          onChange={handleSearchChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {/* Dynamic Filters */}
        {filters.map(({ key, title, options }) => (
          <FacetedFilter
            key={key}
            title={title}
            options={options}
            onFilterChange={(value) => updateFilter(key, value)}
          />
        ))}

        {/* Date Range Filter */}
        {dateField && (
          <DateRangePicker
            dateField={dateField}
            resetSignal={resetSignal}
            onFilterChange={(value) => updateFilter(dateField, value)}
          />
        )}

        {/* Reset Button */}
        {(searchValue || Object.keys(filterValues).length > 0) && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}
