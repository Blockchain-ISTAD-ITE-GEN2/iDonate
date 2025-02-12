"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrganizationPlaceholderComponent() {
  return (
    <Card className="w-full rounded-[10px] bg-iDonate-light-gray border-0 cursor-pointer shadow-md transition-transform hover:scale-[1.02] dark:bg-iDonate-dark-mode">
      <CardContent className="flex flex-col sm:flex-row items-center justify-center p-4 gap-4">
        {/* Image Orgnatioin */}
        <div className="relative aspect-square min-w-[160px] h-full flex-shrink-0 rounded-lg bg-gray-200 dark:bg-gray-700">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>

        <div className="flex flex-col h-full gap-2 flex-1">
          {/* name of org */}
          <Skeleton className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />

          {/* Description */}
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <Skeleton className="h-4 w-11/12 bg-gray-300 dark:bg-gray-600 rounded" />
            <Skeleton className="h-4 w-10/12 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>

          {/* Location Icon and address */}
          <div className="flex items-center gap-2 text-iDonate-gray dark:text-iDonate-green-secondary">
            <Skeleton className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded" />
            <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
