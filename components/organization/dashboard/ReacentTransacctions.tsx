import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { Label } from "@/components/ui/label";

type RecentSalesProps = {
  transactions: TransactionType[];
};

export function ReacentTransacctions({ transactions }: RecentSalesProps) {
  return (
    <div className="flex flex-col h-full items-center">
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className="flex flex-wrap sm:flex-nowrap w-full justify-between items-center border-b border-iDonate-navy-accent py-2 gap-2"
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex items-center">
              <AvatarFallback className="h-10 w-10 border border-iDonate-navy-primary dark:border-iDonate-navy-accent">
                {(transaction.username || "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <p className="text-sm sm:text-base font-medium text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                {transaction.donor}
              </p>
              <p className="text-xs sm:text-sm text-iDonate-gray">
                {transaction.timestamp}
              </p>
            </div>
          </div>

          <span className="text-iDonate-green-primary text-sm sm:text-base font-medium ml-auto dark:text-iDonate-green-secondary">
            ${transaction.amount}
          </span>
        </div>
      ))}

      <Label className="flex items-center py-4 text-sm sm:text-base dark:text-iDonate-navy-accent">
        View all transactions
      </Label>
    </div>
  );
}
