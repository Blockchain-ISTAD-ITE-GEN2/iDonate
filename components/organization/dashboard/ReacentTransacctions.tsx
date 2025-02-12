import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { Label } from "@/components/ui/label";
import donateIcon from "@/public/images/give-and-recieve.png";
import Image from "next/image";
import { CircleDollarSign } from "lucide-react";

type RecentSalesProps = {
  transactions: TransactionType[];
};

export function RecentTransactions({ transactions }: RecentSalesProps) {
  console.log("Transactions received: ", transactions); // Debug log

  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-500 text-center">No transactions available.</p>;
  }

  const formatDateTime = (timestamp: string) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full w-full px-2 sm:px-4">
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row w-full justify-between items-center border-b border-iDonate-navy-accent py-3 gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Avatar className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center border bg-iDonate-green-accent">
              {transaction.avatar ? (
                <Image
                  width={500}
                  height={500}
                  src={transaction.avatar}
                  alt={`${transaction.donor} Avatar`}
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <Image
                  width={32}
                  height={32}
                  src={donateIcon}
                  alt={`${transaction.donor} Avatar`}
                  className="h-8 w-8 sm:h-10 sm:w-10"
                />
              )}
            </Avatar>

            <div className="flex flex-col">
              <p className="text-sm sm:text-base font-medium text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                {transaction.donor}
              </p>
              <p className="text-xs sm:text-sm text-iDonate-gray">
                {formatDateTime(transaction.timestamp)}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-1 sm:gap-2 w-full sm:w-auto">
            <CircleDollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-iDonate-green-primary dark:text-iDonate-green-secondary" />
            <span className="text-iDonate-green-primary text-sm sm:text-base font-medium dark:text-iDonate-green-secondary">
              {transaction.amount}
            </span>
          </div>
        </div>
      ))}

      <Label className="flex justify-center py-4 text-sm sm:text-base text-iDonate-navy-primary dark:text-iDonate-navy-accent">
        មើលប្រតិបត្តិការទាំងអស់
      </Label>
    </div>
  );
}
