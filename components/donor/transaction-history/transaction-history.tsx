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
import { CardsMetricSkeleton } from "@/components/landing/transaction/CardsMetricSkeleton";
import { LoadingTrasaction } from "@/components/landing/transaction/LoadingTrasaction";
import { RecentTransactionsSkeleton } from "@/components/landing/transaction/RecentTransactionsSkeleton";

export default function TransactionHistory() {
  const {
    data: userProfile,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserProfileQuery(undefined);
  const donorUuid = userProfile?.uuid;

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!donorUuid) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/v1/donation/${donorUuid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();

        console.log("User Transaction Data: ", JSON.stringify(data));

        // Transform API response to match `TransactionType`
        const formattedTransactions: TransactionType[] = data.content.map(
          (txn: any) => ({
            id: crypto.randomUUID(), // Generate a unique ID
            avatar: txn.avatar || "", // Ensure avatar is a string
            donor: txn.username || "Anonymous", // Map to `username`
            event: txn.event,
            organization: txn.organization,
            amount: txn.donationAmount, // Map to `amount`
            timestamp: new Date(txn.timestamp).toISOString(), // Ensure timestamp is a formatted string
          })
        );

        formattedTransactions.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        // Update state and keep the transactions sorted
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
          <div>
            <CardsMetricSkeleton />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <DonorCardsMetric data={transactions} />
        )}
      </div>

      {/* ប្រតិបត្តិការថ្មីៗ */}
      <div>
        {loading ? (
          <div>
            <RecentTransactionsSkeleton />
          </div>
        ) : (
          <Card className="w-full xl:w-[480px] bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
            <CardHeader>
              <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                ប្រតិបត្តិការថ្មីៗ
              </CardTitle>
              <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                អ្នកបានបរិច្ចាគចំនួន {transactions.length} ដងក្នុងសប្តាហ៍នេះ។
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DonorReacentTransacctions transactions={transactions.slice(0, 5)} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
