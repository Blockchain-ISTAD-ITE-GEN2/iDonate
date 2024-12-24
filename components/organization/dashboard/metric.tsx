"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
import { AverageType } from "@/difinitions/types/chart/barchart";

type AverageProps = {
  data: AverageType[];
};

const chartConfig = {
  today: {
    label: "Today",
    color: "iDonate-navy-primary",
  },
  average: {
    label: "Average",
    color: "iDonate-green-primary",
  },
} satisfies ChartConfig;

export function CardsMetric({ data }: AverageProps) {
  return (
    <Card className="w-full bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent">
      <CardHeader>
        <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary">
          Overall Transaction
        </CardTitle>
        <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary">
          Your exercise minutes are ahead of where you normally are.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
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
              dataKey="average"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <Area
              type="monotone"
              strokeWidth={2}
              dataKey="average"
              fill="fill-iDonate-green-primary"
              className="fill-iDonate-green-primary"
            />
            <Area
              type="monotone"
              dataKey="today"
              strokeWidth={2}
              fill="fill-iDonate-navy-primary"
              className="fill-iDonate-navy-primary"
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
