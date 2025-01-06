import { Avatar } from "@/components/ui/avatar";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { Label } from "@/components/ui/label";
import donateIcon from "@/public/images/give-and-recieve.png";
import Image from "next/image";

type RecentTransactionProps = {
  transactions: TransactionType[];
};

export function DonorReacentTransacctions({
  transactions,
}: RecentTransactionProps) {
  return (
    <div className="flex flex-col items-center px-0 sm:px-2 lg:px-8">
      {transactions.map((transaction, index) => (
        <div
        key={index}
        className="flex w-full justify-between items-center border-b border-iDonate-navy-accent py-3 gap-4"
      >
        {/* Avatar and Details */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center border bg-iDonate-green-accent">
            <Image
              width={40}
              height={40}
              src={donateIcon}
              alt={`${transaction.donor} Avatar`}
            />
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm line-clamp-1 lg:text-description-eng  sm:line-clamp-none lg:line-clamp-1 font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
              Donated to{" "}
              <span className="font-medium text-iDonate-navy-primarydark:text-iDonate-navy-accent">
                {transaction.event}
              </span>
            </p>
            <p className="text-xs line-clamp-1 sm:text-sub-description-eng sm:line-clamp-none lg:line-clamp-1 text-iDonate-gray">
              Cambodia Kantha Bopha Foundation
            </p>
          </div>
        </div>

        {/* Amount */}
        <span className="ml-auto text-iDonate-green-primary text-sm sm:text-medium-eng text-text-start dark:text-iDonate-green-secondary">
          ${transaction.amount}
        </span>
      </div>
        
      ))}

      {/* View All Transactions */}
      <Label className="flex items-center py-4 text-sm sm:text-medium-eng text-iDonate-navy-secondary cursor-pointer dark:text-iDonate-navy-accent">
        View all transactions
      </Label>
    </div>
  );
}
