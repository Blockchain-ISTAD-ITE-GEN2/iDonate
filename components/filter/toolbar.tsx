import { Input } from "@/components/ui/input";
import { FacetedFilter } from "./faceted-filter";
import { ChangeEvent, useState, useMemo, useEffect } from "react";
import { DateRangePicker } from "./date-range-picker";
import { DateRange } from "react-day-picker";

type ToolbarProps = {
  events: { [key: string]: any }[];
  // events: { [key: string]: string | number | Date }[];
  // events: { [key: string]: string | number | Date }[];
  searchKey: string;
  filtersFace: {
    key: string;
    title: string;
    options: { label: string; value: string }[];
  }[];
  filtersDateRange?: {
    key: string;
    title: string;
  }[];
  onFilterChange: (filteredEvents: any[]) => void;
};

export function Toolbar({
  events,
  searchKey,
  filtersFace,
  filtersDateRange,
  onFilterChange,
}: ToolbarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>(
    {},
  );
  const [dateRange, setDateRange] = useState<
    Record<string, DateRange | undefined>
  >({});
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (key: string, selected: any) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: selected };
      return updatedFilters;
    });
  };

  const handleDateRangeChange = (
    selectedRanges: Record<string, DateRange | undefined>,
  ) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...selectedRanges };
      return updatedFilters;
    });
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event[searchKey]
        ?.toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length === 0 || value.includes(event[key]?.toString());
        }
        if (value?.from && value?.to) {
          const eventDate = new Date(event[key]);
          return (
            (!value?.from || eventDate >= value.from) &&
            (!value?.to || eventDate <= value.to)
          );
        }
        return !value || event[key]?.toString() === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [events, searchKey, filters, searchValue]);

  useEffect(() => {
    onFilterChange(filteredEvents);
  }, [filteredEvents, onFilterChange]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 ">
        <Input
          placeholder={`Search by ${searchKey}`}
          value={searchValue}
          onChange={handleSearchChange}
          className="h-10 w-full md:w-[450px]"
        />
        {/* <div className="flex space-x-2 space-y-2 md:space-y-0"> */}
        {filtersFace?.map(({ key, title, options }) => (
          <FacetedFilter
            key={key}
            filters={[{ key, title, options }]}
            onChange={(selected) => {
              handleFilterChange(key, selected[key]);
            }}
          />
        ))}

        {filtersDateRange && filtersDateRange.length > 0 && (
          <DateRangePicker
            filters={filtersDateRange}
            onChange={handleDateRangeChange} // Pass the selected ranges to handleDateRangeChange
          />
        )}
        {/* </div> */}
      </div>
    </div>
  );
}
