"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleDollarSign, HandCoins, Share2Icon, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { useGetEventByUuidQuery } from "@/redux/services/event-service"; // Adjust the import path as needed
import Image from "next/image";
import donateIcon from "@/public/images/give-and-recieve.png";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { date } from "zod";

type EventDetailBannerProps = {
  uuid: string; // Accept UUID as a prop
};

export function EventDetailBanner({ uuid }: EventDetailBannerProps) {
  const [recentTransactions, setRecentTransactions] = useState<
    TransactionType[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  // Fetch event details using the useGetEventByUuidQuery hook
  const {
    data: event,
    isLoading: isEventLoading,
    isError: isEventError,
    error: eventError,
  } = useGetEventByUuidQuery(uuid);

  const [totalDonors, setTotalDonors] = useState<number>(0);
  const [currentRaised, setCurrentRaised] = useState<number>(0);

  useEffect(() => {
    if (event) {
      setTotalDonors(event.totalDonors ?? 0);
      setCurrentRaised(event.currentRaised ?? 0);
    }
  }, [event]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/v1/donation/event-transactions/${uuid}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();

        const formattedTransactions: TransactionType[] = data.content.map((transaction: any) => ({
          avatar: transaction.avatar || "",
          name: transaction.username || "anonymous",
          amount: transaction.donationAmount || 0,
          timestamp: transaction.timestamp,
        }));

        formattedTransactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        setRecentTransactions(formattedTransactions);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [uuid]); // Depend on `uuid` to fetch data when it changes

  useEffect(() => {
      if (!event?.uuid) return;
    
      const socket = new SockJS(`${process.env.NEXT_PUBLIC_IDONATE_API_URL}/websocket`);
      const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
      });
  
      stompClient.onConnect = () => {
        // Subscribe to event-specific updates
        stompClient.subscribe(`/topic/totalAmountByEvent/${event.uuid}`, (message) => {
          setCurrentRaised(parseFloat(message.body) || 0);
        });
  
        stompClient.subscribe(`/topic/totalDonorsByEvent/${event.uuid}`, (message) => {
          setTotalDonors(parseInt(message.body, 10) || 0);
        });
      };
  
      stompClient.activate();
  
      return () => {
        stompClient.deactivate();
      };
    }, [event?.uuid]);

  // Format the currentRaised amount as $100,000
  const formattedCurrentRaised = event?.currentRaised
    ? `${event.currentRaised.toLocaleString()}`
    : "0";

  return (
    <Card className="w-[440px] h-full border-2 border-iDonate-navy-accent shadow-light">
      <CardHeader className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <CardTitle className="flex gap-3 text-iDonate-navy-primary text-lg  dark:text-iDonate-navy-accent">
            <Users className="text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
            ចំនួនអ្នកបរិច្ចាគសរុប
          </CardTitle>
          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium  dark:text-iDonate-navy-accent">
            {isEventLoading ? "Loading..." : totalDonors || 0} នាក់
          </CardDescription>
        </div>
        <div className="flex flex-col gap-1">
          <CardTitle className="flex gap-3 text-lg text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            <HandCoins className="text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
            ចំនួនថវិការទទួលបាន
          </CardTitle>
          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium dark:text-iDonate-green-secondary">
          <div className="flex items-center gap-1">
          <CircleDollarSign/><span>{isEventLoading ? "Loading..." : formattedCurrentRaised}</span>
          </div>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-9">
        <div className="flex flex-col gap-3​​">
          <Button className="w-full text-[16px] rounded-lg bg-iDonate-green-secondary hover:bg-iDonate-green-secondary text-iDonate-navy-primary font-semibold">
            <Share2Icon />
            ចែករំលែក
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium dark:text-iDonate-navy-accent">
            ការបរិច្ចាគថ្មីៗ
          </CardDescription>

          {loading ? (
            <p className="text-center text-iDonate-gray">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {recentTransactions.slice(0,5).map((transaction, index) => (
        <div
          key={index}
          className="flex flex-wrap sm:flex-nowrap w-full justify-between items-center border-b border-iDonate-navy-accent py-2 gap-2"
        >
          <div className="flex items-center gap-2 sm:gap-4">
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center border bg-iDonate-green-accent">
              {transaction.avatar ? (
                <img
                  src={transaction.avatar}
                  alt={`${transaction.username} Avatar`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  width={40}
                  height={40}
                  src={donateIcon}
                  alt={`${transaction.username} Avatar`}
                />
              )}
            </Avatar>

            <div className="space-y-1">
              <p className="text-sm sm:text-base font-medium text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                {transaction.username}
              </p>
              <p className="text-xs sm:text-sm text-iDonate-gray  dark:text-iDonate-navy-accent">
                {transaction.timestamp}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 h-full">
          <CircleDollarSign className="h-5 w-5 text-iDonate-green-primary dark:text-iDonate-green-secondary align-middle" />
          <p className="text-iDonate-green-primary font-medium text-[17px] leading-none dark:text-iDonate-navy-accent">
            {transaction.amount ? `${transaction.amount}` : "មិនទាន់ទទួលបានថវិការ"}
          </p>
        </div>
        </div>
      ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-3">
        <Button
          className="flex-1 border-iDonate-navy-primary rounded-lg text-iDonate-navy-primary  dark:text-iDonate-navy-accent"
          variant="outline"
        >
          All Donations
        </Button>
        <Button
          className="flex-1 border-iDonate-navy-primary rounded-lg text-iDonate-navy-primary  dark:text-iDonate-navy-accent"
          variant="outline"
        >
          Top Donations
        </Button>
      </CardFooter>
    </Card>
  );
}
