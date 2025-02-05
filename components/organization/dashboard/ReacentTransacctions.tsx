import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { Label } from "@/components/ui/label";
import donateIcon from "@/public/images/give-and-recieve.png";
import Image from "next/image";
import { CircleDollarSign } from "lucide-react";

type RecentSalesProps = {
  transactions: TransactionType[];
};

export function ReacentTransacctions({ transactions }: RecentSalesProps) {
  console.log("Transactions received: ", transactions); // Debug log

  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-500">No transactions available.</p>;
  }

  return (
    <div className="flex flex-col h-full items-center">
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className="flex flex-wrap sm:flex-nowrap w-full justify-between items-center border-b border-iDonate-navy-accent py-2 gap-2"
        >
          <div className="flex items-center gap-2 sm:gap-4">
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center border bg-iDonate-green-accent">
              {transaction.avatar ? (
                <img
                  src={transaction.avatar}
                  alt={`${transaction.username} Avatar`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  width={40}
                  height={40}
                  src={donateIcon}
                  alt={`${transaction.username} Avatar`}
                />
              )}
            </Avatar>

            <div className="space-y-1">
              <p className="text-sm sm:text-base font-medium text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                {transaction.username}
              </p>
              <p className="text-xs sm:text-sm text-iDonate-gray">
                {transaction.timestamp}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-1">
            <CircleDollarSign className="h-6 w-6 text-iDonate-green-primary dark:text-iDonate-green-secondary" />
            <span className="text-iDonate-green-primary text-sm sm:text-base font-medium ml-auto dark:text-iDonate-green-secondary">
              {transaction.amount}
            </span>
          </div>
        </div>
      ))}

      <Label className="flex items-center py-4 text-lg sm:text-base​​ text-iDonate-navy-primary dark:text-iDonate-navy-accent">
        មើលប្រតិបត្តិការទាំងអស់
      </Label>
    </div>
  );
}
