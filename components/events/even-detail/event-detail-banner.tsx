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
import transactions from "@/data/recent-transaction.json";
import { HandCoins, HeartIcon, Share2Icon, Users } from "lucide-react";

export function EventDetailBanner() {
  const recentTransactions = transactions.slice(0, 4);

  return (
    <Card className="w-[440px] h-full border-2 border-iDonate-navy-accent shadow-light">
      <CardHeader className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <CardTitle className="flex gap-3 text-iDonate-gray text-lg">
            <Users className="text-iDonate-navy-primary" />
            Total Donors
          </CardTitle>

          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium">
            1000 Donors
          </CardDescription>
        </div>

        <div className="flex flex-col gap-1">
          <CardTitle className="flex gap-3 text-iDonate-gray text-lg">
            <HandCoins className="text-iDonate-navy-primary" />
            Total Donations
          </CardTitle>

          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium">
            $100,000
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-9">
        <div className="flex flex-col gap-3">
          <Button className="w-full rounded-lg bg-iDonate-green-secondary hover:bg-iDonate-green-secondary text-iDonate-navy-primary font-semibold">
            <Share2Icon />
            Share Event
          </Button>

          <Button className="w-full rounded-lg bg-iDonate-green-secondary hover:bg-iDonate-green-secondary text-iDonate-navy-primary font-semibold">
            <HeartIcon className="fill-iDonate-navy-primary" />
            Donate Now
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          <CardDescription className="text-iDonate-navy-primary text-2xl font-medium">
            Recent Donations
          </CardDescription>

          <div className="flex flex-col gap-2">
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="flex w-full justify-between items-center gap-1 ml-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-full w-auto p-0 m-0 flex items-center gap-1">
                    <AvatarFallback className="h-10 w-10 border border-iDonate-navy-primary">
                      {transaction.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sub-description-eng text-iDonate-gray">
                      {transaction.name || "John Doe"} {/* Donor name */}
                    </p>

                    <p className="text-medium-eng font-semibold text-iDonate-navy-secondary">
                      ${transaction.amount || "0"} {/* Donation amount */}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
