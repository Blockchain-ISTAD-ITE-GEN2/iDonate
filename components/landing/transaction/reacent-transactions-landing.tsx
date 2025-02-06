"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import donateIcon from "@/public/images/give-and-recieve.png";

type Donation = {
  avatar: string;
  donor: string;
  donationAmount: number;
  timestamp: string;
};

export function RecentTransactionsLanding() {
  const [transactions, setTransactions] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/donation`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();

        console.log("User transaction data", data); // Debugging
        setTransactions(data.content);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
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
                  alt={`${transaction.donor} Avatar`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  width={40}
                  height={40}
                  src={donateIcon}
                  alt={`${transaction.donor} Avatar`}
                />
              )}
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
            {transaction.donationAmount.toFixed(2)}
          </span>
        </div>
      ))}

      <Label className="flex items-center py-4 text-sm sm:text-base dark:text-iDonate-navy-accent">
        មើលប្រតិបត្តិការទាំងអស់
      </Label>
    </div>
  );
}
