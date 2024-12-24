"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { TableCalendarDateRangePicker } from "./data-table-date-range-picker";
import { useState } from "react";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  dateField: string;
  searchColumns: string;
  filters?: {
    columnKey: string; // The column key for the table
    title: string; // The display title for the filter
    options: { label: string; value: string }[]; // Filter options
  }[];
};

export function DataTableToolbar<TData>({
  table,
  searchColumns,
  dateField,
  filters = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [resetSignal, setResetSignal] = useState(0);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter ${searchColumns.charAt(0).toUpperCase() + searchColumns.slice(1).toLowerCase()}`}
          value={
            (table.getColumn(`${searchColumns}`)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn(`${searchColumns}`)
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {/* Dynamic Filters */}
        {filters.map(
          ({ columnKey, title, options }) =>
            table.getColumn(columnKey) &&
            options.length > 0 && (
              <DataTableFacetedFilter
                key={columnKey}
                column={table.getColumn(columnKey)}
                title={title}
                options={options}
              />
            ),
        )}

        {/*Date filter with range*/}
        {table.getColumn(`${dateField}`) && (
          <TableCalendarDateRangePicker
            column={table.getColumn(`${dateField}`)}
            resetSignal={resetSignal}
            // dateField={dateField}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setResetSignal((prev) => prev + 1); // Increment reset signal
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
