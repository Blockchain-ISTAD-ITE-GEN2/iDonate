import { CardsMetricSkeleton } from "./CardsMetricSkeleton";
import { RecentTransactionsSkeleton } from "./RecentTransactionsSkeleton";

export function LoadingTrasaction() {

  return (
    <div className="container mx-auto px-4 md:w-full grid gap-4 lg:grid-cols-[1fr_480px] grid-cols-1">
      <div className="flex flex-col gap-4">
        <CardsMetricSkeleton/>
      </div>
      <RecentTransactionsSkeleton/>
    </div>
  );
}