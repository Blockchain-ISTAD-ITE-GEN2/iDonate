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
import { ReacentTransacctions } from "@/components/organization/dashboard/ReacentTransacctions";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { LoadingTrasaction } from "./LoadingTrasaction";
import { TransactionType } from "@/difinitions/types/table-type/transaction";

// Define action types
type ActionType =
  | { type: "FETCH_SUCCESS"; payload: TransactionType[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "ADD_TRANSACTION"; payload: TransactionType };

// Reducer function for state management
const transactionsReducer = (
  state: {
    transactions: TransactionType[];
    loading: boolean;
    error: string | null;
  },
  action: ActionType,
) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { transactions: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { transactions: [], loading: false, error: action.payload };
    case "ADD_TRANSACTION":
      return {
        transactions: [action.payload, ...state.transactions].slice(0, 10), // Keep max 10 recent transactions
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export function BarAndLineChartLanding() {
  const [state, dispatch] = useReducer(transactionsReducer, {
    transactions: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/donation`,
        );
        if (!response.ok) throw new Error("Failed to fetch transactions");

        const data = await response.json();

        console.log("Data transactions: ", data);

        const formattedTransactions: TransactionType[] = data.content.map(
          (txn: any) => ({
            id: crypto.randomUUID(),
            avatar: txn.avatar || "",
            donor: txn.username || "Anonymous",
            event: txn.event,
            organization: txn.organization,
            amount: txn.donationAmount,
            timestamp: new Date(txn.timestamp).toISOString(),
          }),
        );

        formattedTransactions.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );

        dispatch({ type: "FETCH_SUCCESS", payload: formattedTransactions });
      } catch (error: any) {
        dispatch({
          type: "FETCH_ERROR",
          payload: error.message || "Something went wrong",
        });
      }
    };

    fetchTransactions();

    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/websocket`,
    );
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log("WebSocket connected");
      stompClient.subscribe("/topic/recentTransactions", (message) => {
        try {
          const newTransaction = JSON.parse(message.body);

          if (!newTransaction.content || newTransaction.content.length === 0)
            return;

          const formattedTransaction: TransactionType = {
            // id: crypto.randomUUID(),
            avatar: newTransaction.content[0].avatar || "",
            donor: newTransaction.content[0].username || "Anonymous",
            event: newTransaction.content[0].event,
            organization: newTransaction.content[0].organization,
            amount: newTransaction.content[0].donationAmount,
            timestamp: new Date(
              newTransaction.content[0].timestamp,
            ).toISOString(),
          };

          dispatch({ type: "ADD_TRANSACTION", payload: formattedTransaction });
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("WebSocket error:", frame.headers.message);
      dispatch({ type: "FETCH_ERROR", payload: "WebSocket connection error" });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  if (state.loading) return <LoadingTrasaction />;
  if (state.error)
    return <div className="text-red-500">Error: {state.error}</div>;

  return (
    <div className="container mx-auto px-4 md:w-full grid gap-4 lg:grid-cols-[1fr_480px] grid-cols-1">
      <div className="flex flex-col gap-4">
        <CardsMetric data={state.transactions} />
      </div>

      {/* Recent Transactions Card */}
      <Card className="md:w-full lg:w-[480px] bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
        <CardHeader>
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            ប្រតិបត្តិការថ្មីៗ
          </CardTitle>
          <CardDescription className="text-sub-description-eng py-2 text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            អ្នកទទួលបានការបរិច្ចាគចំនួន {state.transactions.length}{" "}
            ក្នុងសប្តាហ៍នេះ។
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReacentTransacctions transactions={state.transactions.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  );
}
