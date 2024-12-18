import { TransactionType } from "@/difinitions/types/table-type/transaction";
import transactions from "@/data/transactions.json";
import { DataTable } from "@/components/table/data-table";
import { transactionColumns } from "@/components/table/columns";


export default function Contributor() {

  const typedTransactions: TransactionType[] = transactions;

  const filters = [
    {
      columnKey: "event",
      title: "Events",
      options: Array.from(
        new Set(typedTransactions.map((transaction) => transaction.event))
      ).map((event) => ({
        label: event,
        value: event,
      }))
    },

    {
      columnKey: "amount",
      title: "Amount Range",
      options: Array.from(
        new Set(typedTransactions.map((transaction) => transaction.amount))
      ).map((amount) => ({
        label: amount.toString(),
        value: amount.toString(),
      }))
    }
  ]

    return (
      <section className="flex flex-col flex-1 p-9">
          <DataTable 
            searchColumns="donor"
            columns={transactionColumns} 
            data={typedTransactions} 
            dateField='date' 
            filters={filters}
          />
      </section>
    );
  }