import { AverageType, BarchartType } from "@/difinitions/types/chart/barchart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardsMetric } from "./metric";
import { Overview } from "./overview";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import barchart from "@/data/barchart.json";
import averages from "@/data/average-data.json";
import transactions from "@/data/transactions.json";
import { ReacentTransacctionsLanding } from "@/components/landing/transaction/reacent-transactions-landing";

export function BarAndLineChartLanding() {
  const barchartdata: BarchartType[] = Object.entries(barchart).map(
    ([name, values]) => ({
      name,
      ...values,
    }),
  );

  const recentTransactions: TransactionType[] = transactions.slice(0, 9).map(transaction => ({
    ...transaction,
    name: "",
    avatar: ""
  }));
  const averageDate: AverageType[] = averages.map((item) => ({
    ...item,
    revenue_growth: 0,
    total_revenue: 0,
  }));

  return (
    <div className="container mx-auto px-4 md:w-full grid gap-4 lg:grid-cols-[1fr_480px] grid-cols-1">
      <div className="flex flex-col gap-4">
        {/* Cards for metrics */}
        <CardsMetric data={averageDate} />
        <Card className="w-full bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:text-iDonate-navy-accent">
          <CardHeader>
            <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
              Comparison this week
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={barchartdata} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Card */}
      <Card className="md:w-full lg:w-[480px] bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
        <CardHeader>
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            Recent Transactions
          </CardTitle>

          <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            You received 10 donations this week..
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ReacentTransacctionsLanding transactions={recentTransactions} />
        </CardContent>
      </Card>
    </div>
  );
}
