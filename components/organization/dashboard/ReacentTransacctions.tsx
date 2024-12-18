import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { Label } from "../../ui/label";

type RecentSalesProps = {
  transactions: TransactionType[];
}

export function ReacentTransacctions({transactions}: RecentSalesProps) {

  return (
    <div className="flex flex-col h-full items-center">
      {transactions.map((transaction, index) => (
        <div key={index} className="flex w-full justify-between items-center border-b border-iDonate-navy-accent py-2 gap-2">
          <div className="flex items-center gap-1" key={index}>

            <Avatar className="h-16 w-16 flex items-center gap-1">
              {/* <AvatarImage src={transaction.donor} alt={`${transaction.donor} Avatar`} /> */}

              <AvatarFallback className="h-10 w-10 border border-iDonate-navy-primary">
                {transaction.donor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="ml-4 space-y-1">
              <p className="text-description-eng font-medium text-iDonate-navy-secondary">{transaction.donor}</p>
              <p className="text-sub-description-eng text-iDonate-gray">{transaction.email}</p>
            </div>
          </div>

          <span className="ml-auto text-iDonate-green-primary text-medium-eng text-start">${transaction.amount}</span>

        </div>
        
      ))}

      <Label className="flex items-center py-4 text-medium-eng text-iDonate-navy-secondary">View all transaction</Label>
    </div>
  );
}
