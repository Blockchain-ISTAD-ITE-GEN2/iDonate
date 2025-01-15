import { DateRange } from "react-day-picker";

export type FacetedFilterType = {
  filters: {
    key: string;
    title: string;
    options: { label: string; value: string }[];
  }[];
  onChange: (selectedFilters: Record<string, string[]>) => void; // Changed to handle multiple selected filters
};

export type DateRangeType = {
  filters: {
    key: string;
    title: string;
  }[];
  onChange: (selectedFilters: Record<string, DateRange>) => void; // Handle multiple filter types
};
