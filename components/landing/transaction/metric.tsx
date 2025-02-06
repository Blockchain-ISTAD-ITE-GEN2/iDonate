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
  today: {
    label: "ចំនួនថវិការបរិច្ចាគ",
    color: "iDonate-navy-primary",
  },
  average: {
    label: "Date",
    color: "iDonate-green-primary",
  },
} satisfies ChartConfig;

export function CardsMetric({ data }: TransactionProps) {
  console.log("Chart Data:", data); // Debugging line

  return (
    <Card className="w-full flex-1 bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
      <CardHeader>
        <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
          ប្រតិបត្តិការសរុប
        </CardTitle>
        <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
          ប្រតិបត្តិការសរុបគណនាប្រចាំថ្ងៃ
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <ChartContainer config={chartConfig} className="flex-1 w-full">
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
              strokeWidth={1.5}
              stroke="#263A61"
              dataKey="amount"
              fill="fill-iDonate-green-primary"
              className="fill-iDonate-green-primary dark:fill-iDonate-green-secondary"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line"/>}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
