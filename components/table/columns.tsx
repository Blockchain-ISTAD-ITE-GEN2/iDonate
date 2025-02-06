"use client";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";

export const transactionColumns: ColumnDef<TransactionType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp");
      const formattedDate = timestamp
        ? format(
            new Date(timestamp as string | number | Date),
            "MMMM do, yyyy h:mm a",
          ) // February 3rd, 2025 09:15 AM
        : "N/A"; // Fallback if timestamp is missing

      return <span>{formattedDate}</span>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true; // No filter applied

      const rowDate = new Date(row.getValue(columnId));
      const { from, to } = filterValue;

      if (from && rowDate < new Date(from)) {
        return false;
      }
      if (to && rowDate > new Date(to)) {
        return false;
      }
      return true;
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Donor" />
    ),
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "donationAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("donationAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="text-iDonate-green-primary dark:text-iDonate-green-secondary">
          {formatted}
        </div>
      );
    },
    // cell: ({ row }) => <div>{row.getValue("email")}</div>,
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "organization",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organization" />
    ),
    cell: ({ row }) => {
      const organization = row.getValue("organization") as { name: string };
      return <div>{organization?.name}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "event",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event" />
    ),
    cell: ({ row }) => {
      const organization = row.getValue("event") as { name: string };
      return <div>{organization?.name}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
