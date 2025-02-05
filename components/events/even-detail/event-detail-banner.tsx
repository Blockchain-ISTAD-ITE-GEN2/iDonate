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
import { HandCoins, Share2Icon, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import { useGetEventByUuidQuery } from "@/redux/services/event-service"; // Adjust the import path as needed
import Image from "next/image";
import donateIcon from "@/public/images/give-and-recieve.png";

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

        const formattedTransactions = data.content.map((transaction: any) => ({
          avatar: transaction.avatar || "",
          name: transaction.username || "anonymous",
          amount: transaction.donationAmount || 0,
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
  }, [uuid]); // Depend on `uuid` to fetch data when it changes

  // Format the currentRaised amount as $100,000
  const formattedCurrentRaised = event?.currentRaised
    ? `$${event.currentRaised.toLocaleString()}`
    : "$0";

  return (
    <Card className="w-[440px] h-full border-2 border-iDonate-navy-accent shadow-light">
      <CardHeader className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <CardTitle className="flex gap-3 text-iDonate-gray text-lg">
            <Users className="text-iDonate-navy-primary" />
            ចំនួនអ្នកបរិច្ចាគសរុប
          </CardTitle>
          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium">
            {isEventLoading ? "Loading..." : event?.totalDonors || 0} Donors
          </CardDescription>
        </div>
        <div className="flex flex-col gap-1">
          <CardTitle className="flex gap-3 text-iDonate-gray text-lg">
            <HandCoins className="text-iDonate-navy-primary" />
            ចំនួនថវិការទទួលបាន
          </CardTitle>
          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium">
            {isEventLoading ? "Loading..." : formattedCurrentRaised}
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
          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium">
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
              <p className="text-xs sm:text-sm text-iDonate-gray">
                {transaction.timestamp}
              </p>
            </div>
          </div>

          <span className="text-iDonate-green-primary text-sm sm:text-base font-medium ml-auto dark:text-iDonate-green-secondary">
            ${transaction.amount?.toFixed(2)}
          </span>
        </div>
      ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-3">
        <Button
          className="flex-1 border-iDonate-navy-primary rounded-lg text-iDonate-navy-primary"
          variant="outline"
        >
          All Donations
        </Button>
        <Button
          className="flex-1 border-iDonate-navy-primary rounded-lg text-iDonate-navy-primary"
          variant="outline"
        >
          Top Donations
        </Button>
      </CardFooter>
    </Card>
  );
}
