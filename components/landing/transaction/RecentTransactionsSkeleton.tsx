"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentTransactionsSkeleton() {
  return (
    <Card className="md:w-full lg:w-[480px] bg-transparent bg-white hover:scale-[1.01] cursor-pointer  text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
      <CardHeader>
        <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
          <Skeleton className="h-6 w-48 mb-1" />
        </CardTitle>
        <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
          <Skeleton className="h-4 w-56" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex flex-col flex-1">
                <Skeleton className="h-5 w-45 mb-1 flex-shrink-0 text-iDonate-navy-secondary dark:text-iDonate-navy-accent" />
                <Skeleton className="h-4 w-32 text-iDonate-navy-secondary dark:text-iDonate-navy-accent" />
              </div>
              <Skeleton className="h-4 w-16 text-iDonate-navy-secondary dark:text-iDonate-navy-accent" />
            </div>
          ))}
        </div>

        <Skeleton className="h-5 w-25 m-3 items-center mb-1 flex-shrink-0 text-iDonate-navy-secondary dark:text-iDonate-navy-accent" />
      </CardContent>
    </Card>
  );
}
