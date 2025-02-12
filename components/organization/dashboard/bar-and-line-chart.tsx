"use client";

import { useState, useEffect } from "react";
import { AverageType, BarchartType } from "@/difinitions/types/chart/barchart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardsMetric } from "./metric";
import { Overview } from "./overview";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import barchart from "@/data/barchart.json";
import { RecentTransactions } from "./ReacentTransacctions";

export function BarAndLineChart({ orgUuid }: { orgUuid: string }) {
  const [recentTransactions, setRecentTransactions] = useState<
    TransactionType[]
  >([]);
  const [averageData, setAverageData] = useState<AverageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const barchartdata: BarchartType[] = Object.entries(barchart).map(
    ([name, values]) => ({
      name,
      ...values,
    }),
  );

  useEffect(() => {
    if (!orgUuid) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/donation/org-transactions/${orgUuid}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();

        console.log("Fetched transactions data:", data);

        // Format transactions
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

        formattedTransactions.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );

        setRecentTransactions(formattedTransactions);

        // Compute average donation per day
        const aggregatedData: Record<
          string,
          { totalAmount: number; count: number }
        > = {};

        formattedTransactions.forEach((txn: any) => {
          const date = txn.timestamp.split("T")[0]; // Extract YYYY-MM-DD
          if (!aggregatedData[date]) {
            aggregatedData[date] = { totalAmount: 0, count: 0 };
          }
          aggregatedData[date].totalAmount += txn.amount;
          aggregatedData[date].count += 1;
        });

        const computedAverages: AverageType[] = Object.keys(aggregatedData).map(
          (date) => ({
            date,
            amount:
              aggregatedData[date].totalAmount / aggregatedData[date].count, // Compute average per day
          }),
        );

        setAverageData(computedAverages);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [orgUuid]);

  return (
    <div className="md:w-full grid gap-4 xl:grid-cols-[1fr_480px] grid-cols-1">
      <div className="flex flex-col gap-4 lg:w-[650px]">
        {/* ✅ Render CardsMetric with computed average data */}
        <CardsMetric data={averageData} />
      </div>

      {/* ប្រតិបត្តិការថ្មីៗ Card */}
      <Card className="w-full sm:w-full md:w-full lg:w-full  bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
        <CardHeader>
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            ប្រតិបត្តិការថ្មីៗ
          </CardTitle>

          <CardDescription className="text-sub-description-eng py-2 text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            អ្នកទទួលបានការបរិច្ចាគចំនួន {recentTransactions.length}​
            ក្នុងសប្តាហ៍នេះ។
          </CardDescription>
        </CardHeader>

        <CardContent className="">
          <div>
            {loading && <p>Loading transactions...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <RecentTransactions
                transactions={recentTransactions.slice(0, 5)}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
