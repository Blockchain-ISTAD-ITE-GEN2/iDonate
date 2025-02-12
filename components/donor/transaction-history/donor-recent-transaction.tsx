import { Avatar } from "@/components/ui/avatar";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { Label } from "@/components/ui/label";
import donateIcon from "@/public/images/give-and-recieve.png";
import Image from "next/image";
import { CircleDollarSign } from "lucide-react";

type RecentTransactionProps = {
  transactions: TransactionType[];
};

export function DonorReacentTransacctions({
  transactions,
}: RecentTransactionProps) {
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
    <div className="flex flex-col items-center px-0 sm:px-2 lg:px-8">
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex w-full justify-between items-center border-b border-iDonate-navy-accent py-3 gap-4"
          >
            {/* Avatar and Details */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center border bg-iDonate-green-accent">
                {transaction.avatar ? (
                  <Image
                    width={500}
                    height={500}
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
                <p className="text-sm line-clamp-1 lg:text-description-eng sm:line-clamp-none lg:line-clamp-1 font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                  បានបរិច្ចាគទៅ{" "}
                  <span className="font-medium text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                    {transaction.event?.eventName || "Unknown Event"}
                  </span>
                </p>
                <p className="text-xs line-clamp-1 sm:text-sub-description-eng sm:line-clamp-none lg:line-clamp-1 text-iDonate-gray">
                  {transaction.event?.orgName || "Unknown Organization"}
                </p>
              </div>
            </div>

            {/* ចំនួនថវិការបរិច្ចាគ */}
            <div className="flex justify-center items-center gap-1">
              <CircleDollarSign className="h-6 w-6 text-iDonate-green-primary dark:text-iDonate-green-secondary" />
              <span className="text-iDonate-green-primary text-sm sm:text-base font-medium ml-auto dark:text-iDonate-green-secondary">
                {transaction.amount}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No recent transactions available</p>
      )}

      {/* View All Transactions */}
      <Label className="flex items-center py-4 text-sm sm:text-medium-eng text-iDonate-navy-secondary cursor-pointer dark:text-iDonate-navy-accent">
        មើលប្រតិបត្តិការទាំងអស់
      </Label>
    </div>
  );
}
