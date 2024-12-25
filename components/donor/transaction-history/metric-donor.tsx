"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@/difinitions/types/table-type/transaction";

type TransactionProps = {
  data: TransactionType[];
};

const chartConfig = {   
  amount: {
    label: "Amount",
    color: "iDonate-navy-primary",
  },
  date: {
    label: "Date",
    color: "iDonate-navy-secondary",
  },
} satisfies ChartConfig;

export function DonorCardsMetric({ data }: TransactionProps) {
  return (
    <Card className="w-full h-auto bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent">
      <CardHeader>
        <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary">
          Overall Transaction
        </CardTitle>
        <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary">
          All transactions made by you
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />

            <YAxis
              dataKey="amount"
              tickLine={false}
              axisLine={false}
              tickMargin={30}
              tickFormatter={(value) => value}

            />

            <Area
              type="monotone"
              strokeWidth={2}
              dataKey="amount"
              fill="fill-iDonate-green-primary"
              className="fill-iDonate-green-primary"
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
