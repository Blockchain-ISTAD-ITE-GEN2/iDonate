import { Input } from "@/components/ui/input";
import { FacetedFilter } from "./faceted-filter";
import { ChangeEvent, useState, useMemo, useEffect } from "react";
import { DateRangePicker } from "./date-range-picker";
import { DateRange } from "react-day-picker";

interface ToolbarProps {
  events: { [key: string]: string | number | Date }[];
  searchKey: string;
  filtersFace: {
    key: string;
    title: string;
    options: { label: string; value: string }[];
  }[];
  filtersDateRange: {
    key: string;
    title: string;
  }[];
  onFilterChange: (filteredEvents: any[]) => void;
}

export function Toolbar({
  events,
  searchKey,
  filtersFace,
  filtersDateRange,
  onFilterChange,
}: ToolbarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [dateRange, setDateRange] = useState<Record<string, DateRange | undefined>>({});

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (key: string, selected: any) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev, [key]: selected };
      return updatedFilters;
    });
  };

  const handleDateRangeChange = (selectedRanges: Record<string, DateRange | undefined>) => {
    setDateRange(selectedRanges); // Update the date range state with selected range
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event[searchKey]
        ?.toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesFilters = Object.entries(selectedFilters).every(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length === 0 || value.includes(event[key]?.toString());
        }
        return !value || event[key]?.toString() === value;
      });

      // Date range filtering logic
      const matchesDateRange = Object.entries(dateRange).every(([key, range]) => {
        if (!range?.from && !range?.to) return true;
        const eventDate = new Date(event[key]);
        return (
          (!range?.from || eventDate >= range.from) &&
          (!range?.to || eventDate <= range.to)
        );
      });

      return matchesSearch && matchesFilters && matchesDateRange;
    });
  }, [events, searchKey, selectedFilters, searchValue, dateRange]);

  useEffect(() => {
    onFilterChange(filteredEvents);
  }, [filteredEvents, onFilterChange]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Search by ${searchKey}`}
          value={searchValue}
          onChange={handleSearchChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {filtersFace.map(({ key, title, options }) => (
          <FacetedFilter
            key={key}
            filters={[{ key, title, options }]}
            onChange={(selected) => {
              handleFilterChange(key, selected[key]);
            }}
          />
        ))}

        {filtersDateRange && (
          <DateRangePicker
            filters={filtersDateRange}
            onChange={handleDateRangeChange} // Pass the selected ranges to handleDateRangeChange
          />
        )}
      </div>
    </div>
  );
}
