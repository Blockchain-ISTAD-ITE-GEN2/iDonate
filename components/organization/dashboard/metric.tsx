"use client"

import { Line, LineChart} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { AverageType } from "@/difinitions/types/chart/barchart"

type AverageProps = {
  data: AverageType[];
}


const chartConfig = {
  today: {
    label: "Today",
    color: "iDonate-navy-primary",
  },
  average: {
    label: "Average",
    color: "iDonate-green-primary",
  },
} satisfies ChartConfig

export function CardsMetric({ data }: AverageProps) {
  return (
    <Card className="w-full bg-iDonate-light-gray rounded-lg border border-iDonate-navy-accent">
      <CardHeader>

        <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary">Overall Transaction</CardTitle>

        <CardDescription className="text-sub-description-eng text-iDonate-navy-secondary">
          Your exercise minutes are ahead of where you normally are.
        </CardDescription>

      </CardHeader>

      <CardContent className="pb-4">

        <ChartContainer config={chartConfig} className="h-[200px] w-full">

          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="average"
              activeDot={{
                r: 10
              }}
              className="stroke-iDonate-green-primary"
            />

            <Line
              type="monotone"
              dataKey="today"
              strokeWidth={2}
              activeDot={{
                r: 10
              }}
              className="stroke-iDonate-navy-primary"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>

        </ChartContainer>

      </CardContent>

    </Card>
  )
}
