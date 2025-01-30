"use client";

import { useState, useEffect } from "react";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { DonorCardsMetric } from "@/components/donor/transaction-history/metric-donor";
import { DonorReacentTransacctions } from "./donor-recent-transaction";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionType } from "@/difinitions/types/table-type/transaction"; // Ensure this import is correct

export default function TransactionHistory() {
  const { data: userProfile, isLoading: isUserLoading, isError: isUserError } = useGetUserProfileQuery(undefined);
  const donorUuid = userProfile?.uuid;

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!donorUuid) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/donation/${donorUuid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();

        console.log("User Transaction Data: ", data)

        // Transform API response to match `TransactionType`
        const formattedTransactions: TransactionType[] = data.content.map((txn: any) => ({
          id: crypto.randomUUID(), // Generate a unique ID
          donor: txn.username,
          email: "", // No email in API response, so provide a default
          event: "Donation", // Default value
          date: txn.timestamp,
          amount: txn.donationAmount,
          avatar: txn.avatar || null,
        }));

        setTransactions(formattedTransactions);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [donorUuid]);

  return (
    <div className="flex flex-col xl:flex-row w-full h-full gap-4">
      {/* Cards for metrics */}
      <div className="flex-1">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <DonorCardsMetric data={transactions} />
        )}
      </div>

      {/* Recent Transactions */}
      <Card className="w-full xl:w-[480px] bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
        <CardHeader>
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            Recent Transactions
          </CardTitle>
          <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            You have donated {transactions.length} times this week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <DonorReacentTransacctions transactions={transactions} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
