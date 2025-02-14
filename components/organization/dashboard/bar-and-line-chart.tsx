"use client";

import { useEffect, useReducer } from "react";
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
import { AverageType } from "@/difinitions/types/chart/barchart";
import { RecentTransactions } from "./ReacentTransacctions";

// Define action types
type ActionType =
  | { type: "FETCH_SUCCESS"; payload: TransactionType[] }
  | { type: "FETCH_ERROR"; payload: string };

// Reducer function for state management
const transactionsReducer = (
  state: { transactions: TransactionType[]; loading: boolean; error: string | null },
  action: ActionType
) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { transactions: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { transactions: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export function BarAndLineChart({ orgUuid }: { orgUuid: string }) {
  const [state, dispatch] = useReducer(transactionsReducer, {
    transactions: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!orgUuid) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/donation/org-transactions/${orgUuid}`
        );
        if (!response.ok) throw new Error("Failed to fetch transactions");

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
            organization: txn.organization || null,
            amount: Number(txn.donationAmount) || 0,
            timestamp: txn.timestamp ? new Date(txn.timestamp).toISOString() : "",
            description: txn.description || "No description available",
            order_date: txn.order_date || "",
            end_date: txn.end_date || "",
          })
        );

        // Sort transactions by timestamp (descending)
        formattedTransactions.sort((a, b) => {
          const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
          const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
          return dateB - dateA;
        });

        dispatch({ type: "FETCH_SUCCESS", payload: formattedTransactions });
      } catch (err: any) {
        dispatch({ type: "FETCH_ERROR", payload: err.message || "Something went wrong" });
      }
    };

    fetchTransactions();
  }, [orgUuid]);

  return (
    <div className="md:w-full grid gap-4 xl:grid-cols-[1fr_480px] grid-cols-1">
      <div className="flex flex-col gap-4 lg:w-[650px]">
        {/* ✅ Render CardsMetric with computed average data */}
        <CardsMetric data={state.transactions} />
      </div>

      {/* ប្រតិបត្តិការថ្មីៗ Card */}
      <Card className="w-full sm:w-full md:w-full lg:w-full bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
        <CardHeader>
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            ប្រតិបត្តិការថ្មីៗ
          </CardTitle>

          <CardDescription className="text-sub-description-eng py-2 text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            អ្នកទទួលបានការបរិច្ចាគចំនួន {state.transactions.length} ក្នុងសប្តាហ៍នេះ។
          </CardDescription>
        </CardHeader>

        <CardContent className="">
          <div>
            {state.loading && <p>Loading transactions...</p>}
            {state.error && <p className="text-red-500">{state.error}</p>}
            {!state.loading && !state.error && (
              <RecentTransactions transactions={state.transactions.slice(0, 5)} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
