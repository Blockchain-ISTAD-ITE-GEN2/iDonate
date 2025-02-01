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
            Total Donors
          </CardTitle>
          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium">
            {isEventLoading ? "Loading..." : event?.totalDonors || 0} Donors
          </CardDescription>
        </div>
        <div className="flex flex-col gap-1">
          <CardTitle className="flex gap-3 text-iDonate-gray text-lg">
            <HandCoins className="text-iDonate-navy-primary" />
            Total Donations
          </CardTitle>
          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium">
            {isEventLoading ? "Loading..." : formattedCurrentRaised}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-9">
        <div className="flex flex-col gap-3">
          <Button className="w-full rounded-lg bg-iDonate-green-secondary hover:bg-iDonate-green-secondary text-iDonate-navy-primary font-semibold">
            <Share2Icon />
            Share Event
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium">
            Recent Donations
          </CardDescription>

          {loading ? (
            <p className="text-center text-iDonate-gray">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {recentTransactions.map((transaction: any, index) => (
                <div
                  key={index}
                  className="flex w-full justify-between items-center gap-1 ml-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-full w-auto p-0 m-0 flex items-center gap-1">
                      <AvatarFallback className="h-10 w-10 border border-iDonate-navy-primary">
                        {transaction.name
                          .split(" ")
                          .map((n: any) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sub-description-eng text-iDonate-gray">
                        {transaction.name}
                      </p>
                      <p className="text-medium-eng font-semibold text-iDonate-navy-secondary">
                        ${transaction.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
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
