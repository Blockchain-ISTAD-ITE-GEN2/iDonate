import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EvnetCardPlaceholder() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer rounded-lg shadow-md bg-transparent dark:bg-iDonate-dark-mode"
        >
          {/* Image Placeholder */}
          <CardHeader className="w-full aspect-video p-0 rounded-t-lg overflow-hidden">
            <Skeleton className="w-full h-full rounded-lg" />
          </CardHeader>

          {/* Content */}
          <CardContent className="p-4 flex flex-col gap-4">
            {/* Dates Section */}
            <div className="flex justify-between text-sm">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="flex flex-col flex-1">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Donor and Amount Information */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
