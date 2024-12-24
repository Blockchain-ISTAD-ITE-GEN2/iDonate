import { AverageType, BarchartType } from "@/difinitions/types/chart/barchart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { CardsMetric } from "./metric";
import { Overview } from "./overview";
import { TransactionType } from "@/difinitions/types/table-type/transaction";
import barchart from "@/data/barchart.json";
import averages from "@/data/average-data.json";
import transactions from "@/data/transactions.json";
import { ReacentTransacctions } from "@/components/organization/dashboard/ReacentTransacctions";

export function BarAndLineChart() {
  const barchartdata: BarchartType[] = Object.entries(barchart).map(
    ([name, values]) => ({
      name,
      ...values,
    }),
  );

  const recentTransactions: TransactionType[] = transactions.slice(0, 9);
  const averageDate: AverageType[] = averages;

  return (
    <div className="md:w-full grid gap-4 lg:grid-cols-[1fr_480px] grid-cols-1">
      <div className="flex flex-col gap-4">
        {/* Cards for metrics */}
        <CardsMetric data={averageDate} />

        <Card className="w-full bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent">
          <CardHeader>
            <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary">
              Comparison this week
            </CardTitle>
          </CardHeader>

          <CardContent className="pl-2">
            <Overview data={barchartdata} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Card */}
      <Card className="md:w-full lg:w-[480px] bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent">
        <CardHeader>
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary">
            Recent Transactions
          </CardTitle>

          <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary">
            You received 10 donations this week..
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ReacentTransacctions transactions={recentTransactions} />
        </CardContent>
      </Card>
    </div>
  );
}
