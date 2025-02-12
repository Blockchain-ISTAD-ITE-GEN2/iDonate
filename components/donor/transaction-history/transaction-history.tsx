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
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { CardsMetricSkeleton } from "@/components/landing/transaction/CardsMetricSkeleton";
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!donorUuid) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/v1/donation/${donorUuid}`,
          { signal }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch transactions: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("User Transaction Data: ", JSON.stringify(data));

        if (!data?.content || !Array.isArray(data.content)) {
          throw new Error("Invalid transaction data format");
        }

        // Transform API response to match `TransactionType`
        const formattedTransactions: TransactionType[] = data.content.map(
          (txn: any) => ({
            id: txn.id || crypto.randomUUID(),
            avatar: txn.avatar || "",
            donor: txn.username || "Anonymous",
            email: txn.email || "",
            event: {
              eventName: txn.event?.eventName || "Unknown Event",
              orgName: txn.event?.orgName || "Unknown Organization",
            },
            organization: txn.organization || null, // Keeping full organization object
            amount: Number(txn.donationAmount) || 0, // Ensure it's a number
            timestamp: txn.timestamp ? new Date(txn.timestamp).toISOString() : null,
            description: txn.description || "No description available",
            order_date: txn.order_date || "",
            end_date: txn.end_date || "",
          })
        );

        // Sort transactions by most recent
        formattedTransactions.sort(
          (a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime()
        );

        setTransactions(formattedTransactions);
      } catch (err: any) {
        if (err.name === "AbortError") return; // Prevent state updates after unmount
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();

    return () => controller.abort(); // Cleanup function to avoid memory leaks
  }, [donorUuid]);

  return (
    <div className="flex flex-col xl:flex-row w-full h-full gap-4">
      {/* Cards for metrics */}
      <div className="flex-1">
        {loading ? (
          <CardsMetricSkeleton />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <DonorCardsMetric data={transactions} />
        )}
      </div>

      {/* Recent Transactions */}
      <div>
        {loading ? (
          <RecentTransactionsSkeleton />
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
