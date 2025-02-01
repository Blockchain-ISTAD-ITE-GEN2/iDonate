"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

type Donation = {
  avatar: string ;
  username: string;
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/donation`,
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
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex items-center">
            <img
              src={transaction.avatar} 
              alt={transaction.username} 
              className="h-full w-full rounded-full object-cover"
              onError={(e) => (e.currentTarget.src = "/fallback-avatar.png")} // Optional: Provide a fallback image
            />
            <AvatarFallback className="h-10 w-10 border border-iDonate-navy-primary dark:border-iDonate-navy-accent">
              {transaction.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
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

          <span className="text-iDonate-green-primary text-sm sm:text-base font-medium ml-auto dark:text-iDonate-green-secondary">
            ${transaction.donationAmount.toFixed(2)}
          </span>
        </div>
      ))}

      <Label className="flex items-center py-4 text-sm sm:text-base dark:text-iDonate-navy-accent">
        View all transactions
      </Label>
    </div>
  );
}
