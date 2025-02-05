"use client";

import { useEffect, useState } from "react";
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
import averages from "@/data/average-data.json";
import { ReacentTransacctions } from "@/components/organization/dashboard/ReacentTransacctions";
import { AverageType, BarchartType } from "@/difinitions/types/chart/barchart";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { CardsMetricSkeleton } from "./CardsMetricSkeleton";
import { RecentTransactionsSkeleton } from "./RecentTransactionsSkeleton";
import { LoadingTrasaction } from "./LoadingTrasaction";

export function BarAndLineChartLanding() {
  const [recentTransactions, setRecentTransactions] = useState<
    TransactionType[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const barchartdata: BarchartType[] = Object.entries(barchart).map(
    ([name, values]) => ({
      name,
      ...values,
    }),
  );

  const averageDate: AverageType[] = averages.map((item) => ({
    ...item,
    revenue_growth: 0,
    total_revenue: 0,
  }));

  useEffect(() => {
    // Fetch initial transactions
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/donation`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();

        console.log("Data transactions: ", data);

        // Map the API response to TransactionType format
        const formattedTransactions = data.content.map((transaction: any) => ({
          avatar: transaction.avatar || "",
          donor: transaction.username,
          amount: transaction.donationAmount,
          timestamp: transaction.timestamp,
        }));

        setRecentTransactions(formattedTransactions);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();

    // Set up WebSocket connection
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/websockket`,
    );
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log("WebSocket connected");
      stompClient.subscribe("/topic/recentDonationTransaction", (message) => {
        const newTransaction = JSON.parse(message.body);

        // Map the new transaction to TransactionType format
        const formattedTransaction: TransactionType = {
          avatar: newTransaction.avatar || "",
          donor: newTransaction.username,
          amount: newTransaction.donationAmount,
          timestamp: newTransaction.timestamp,
        };

        // Update the recentTransactions state
        setRecentTransactions((prevTransactions) => [
          formattedTransaction,
          ...prevTransactions,
        ]);
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("WebSocket error:", frame.headers.message);
      setError("WebSocket connection error");
    };

    stompClient.activate();

    // Cleanup WebSocket connection on unmount
    return () => {
      stompClient.deactivate();
    };
  }, []);

  if (loading) {
    return (
      <>
        <LoadingTrasaction />
      </>
    );
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="container mx-auto px-4 md:w-full grid gap-4 lg:grid-cols-[1fr_480px] grid-cols-1">
      <div className="flex flex-col gap-4">
        {/* Cards for metrics */}
        {/* <CardsMetricSkeleton/> */}
        <CardsMetric data={recentTransactions} />
      </div>

      {/* Recent Transactions Card */}
      <Card className="md:w-full lg:w-[480px] bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
        <CardHeader>
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            Recent Transactions
          </CardTitle>
          <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            You received {recentTransactions.length} donations this week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReacentTransacctions transactions={recentTransactions} />
        </CardContent>
      </Card>
    </div>
  );
}
