import { Avatar } from "@/components/ui/avatar";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { Label } from "@/components/ui/label";
import { AvatarImage } from "@radix-ui/react-avatar";
import donateIcon from "@/public/images/give-and-recieve.png";
import Image from "next/image";

type RecentTransactionProps = {
  transactions: TransactionType[];
};

export function DonorReacentTransacctions({ transactions }: RecentTransactionProps) {
  return (
    <div className="flex flex-col items-center">
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className="flex w-full justify-between items-center border-b border-iDonate-navy-accent py-2 gap-2"
        >
          <div className="flex items-center gap-1" key={index}>
            <Avatar className="h-16 w-16 flex items-center justify-center border bg-iDonate-green-accent  ">
              <Image width={40} height={40} src={donateIcon} alt={`${transaction.donor} Avatar`} />

            </Avatar>

            <div className="ml-4 space-y-1">
              <p className="text-description-eng font-normal text-iDonate-navy-secondary">
                Donated to <span className="font-medium text-iDonate-navy-primary">{transaction.event}</span>
              </p>
              <p className="text-sub-description-eng text-iDonate-gray">
                {/* {transaction.email} */}
                Cambodia Kantha Bopha Foundation
              </p>
            </div>
          </div>

          <span className="ml-auto text-iDonate-green-primary text-medium-eng text-start">
            ${transaction.amount}
          </span>
        </div>
      ))}

      <Label className="flex items-center py-4 text-medium-eng text-iDonate-navy-secondary">
        View all transaction
      </Label>
    </div>
  );
}
