"use client";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { DataTable } from "@/components/table/data-table";
import { transactionColumns } from "@/components/table/columns";
import { useGetOrgTransactionsQuery } from "@/redux/services/donation-service";
import { useParams } from "next/navigation";

export default function Contributor() {
  const params = useParams();
  const orgUuid = String(params.uuid); // Ensures `uuid` is a string

  const {
    data: orgTransaction,
    isError,
    isLoading,
  } = useGetOrgTransactionsQuery(orgUuid);

  const typedTransactions: TransactionType[] = orgTransaction?.content || [];

  console.log("typedTransactions", typedTransactions);

  const filters = [
    {
      columnKey: "username",
      title: "Donor",
      options: Array.from(
        new Set(typedTransactions?.map((transaction) => transaction.username)),
      )
        .filter((event) => event !== undefined)
        .map((event) => ({
          label: event as string,
          value: event as string,
        })),
    },

    {
      columnKey: "donationAmount",
      title: "Amount Range",
      options: Array.from(
        new Set(
          typedTransactions?.map((transaction) => transaction.donationAmount),
        ),
      )
        .filter((amount) => amount !== undefined)
        .map((amount) => ({
          label: amount as string,
          value: amount as string,
        })),
    },
  ];

  return (
    <section className="flex flex-col flex-1 p-9">
      <DataTable
        searchColumns="username"
        columns={transactionColumns}
        data={typedTransactions}
        dateField="timestamp"
        filters={filters}
      />
    </section>
  );
}
