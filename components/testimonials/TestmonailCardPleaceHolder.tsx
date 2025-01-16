"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestmonailCardPleaceHolder() {
  return (
    <div className="w-full">
      <Card className="h-full">
        <CardContent className="p-6 md:gap-2 gap-4">
          <div className="flex flex-col items-center text-center h-full">
            {/* Avatar Placeholder */}
            <Skeleton className="h-16 w-16 md:h-20 md:w-20 mb-4 rounded-full" />
            
            {/* Name Placeholder */}
            <Skeleton className="h-4 w-32 md:w-40 mb-2 rounded-full" />
            
            {/* Role Placeholder */}
            <Skeleton className="h-3 w-24 md:w-32 mb-4 rounded-full" />
            
            {/* Testimonial Text Placeholder */}
            <Skeleton className="h-3 w-full md:w-4/5 mb-2 rounded" />
            <Skeleton className="h-3 w-3/4 md:w-3/5 mb-2 rounded" />
            <Skeleton className="h-3 w-2/3 md:w-2/5 mb-2 rounded" />
            <Skeleton className="h-3 w-2/3 md:w-1/5 mb-2 rounded" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
