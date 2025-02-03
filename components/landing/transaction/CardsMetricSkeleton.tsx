"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardsMetricSkeleton() {
  return (
    <Card className="w-full bg-white rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
      <CardHeader>
        <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
          <Skeleton className="h-6 w-40" />
        </CardTitle>
        <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
          <Skeleton className="h-4 w-56" />
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px] w-full flex flex-col gap-3">
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
