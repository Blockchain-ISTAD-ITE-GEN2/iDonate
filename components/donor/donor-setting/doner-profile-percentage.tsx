"use client";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Check, X } from "lucide-react";
import { useMemo } from "react";

// Static categories with dynamic completion
const staticCategories = [
  { category: "Image", fill: "#1E90FF" }, // Blue
  { category: "Full Name", fill: "#32CD32" }, // Green
  { category: "Email", fill: "#FFD700" }, // Yellow
  { category: "Contact", fill: "#FF4500" }, // Orange
  { category: "Address", fill: "#8A2BE2" }, // Purple
  { category: "Bio", fill: "#FF1493" }, // Pink
];

// Chart configuration stays constant
const chartConfig = {
  completion: {
    label: "Completion",
  },
} satisfies ChartConfig;

type DonorProfilePercentageProps = {
  percentages: number[];
};

export function DonorProfilePercentage({
  percentages,
}: DonorProfilePercentageProps) {
  // Merge static categories with dynamic percentages
  const chartData = useMemo(() => {
    // Normalize percentages to ensure they don't exceed 100
    const totalInput = percentages.reduce((acc, curr) => acc + curr, 0);

    const normalizedPercentages =
      totalInput > 100
        ? percentages.map((p) => (p / totalInput) * 100) // Scale down to 100%
        : percentages;

    // Create base data with normalized values
    const baseData = staticCategories.map((category, index) => ({
      ...category,
      completion: normalizedPercentages[index] || 0,
    }));

    return baseData;
  }, [percentages]);

  return (
    <Card className="self-start w-full lg:w-auto flex flex-col rounded-lg border-2 border-iDonate-navy-accent shadow-light">
      <CardHeader className="items-center pb-0">
        <CardTitle className="w-full text-lg lg:text-2xl text-center leading-9 text-iDonate-navy-primary whitespace-nowrap dark:text-iDonate-navy-accent">
          Profile Completion
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 m-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="completion"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const { cx, cy } = viewBox;
                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={cx}
                          y={cy}
                          className="fill-iDonate-green-primary text-3xl font-bold"
                        >
                          {Math.min(
                            percentages.reduce((acc, curr) => acc + curr, 0),
                            100
                          )}
                          %
                        </tspan>
                        <tspan
                          x={cx}
                          y={(cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Completed
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardContent className="flex flex-col gap-2 md:gap-4 xl:gap-6">
        {chartData.map((data, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              {data.completion > 0 ? (
                <Check className="text-medium-eng text-iDonate-green-primary" />
              ) : (
                <X className="text-medium-eng text-iDonate-error" />
              )}
              <span className="text-sm sm:text-description-eng lg:text-medium-eng text-iDonate-navy-primary text-left whitespace-nowrap dark:text-iDonate-navy-accent">
                {data.category}
              </span>
            </div>
            <span className="text-sm sm:text-description-eng lg:text-medium-eng text-iDonate-green-primary text-left">
              {data.completion > 0 ? `${data.completion.toFixed(2)}%` : "0%"}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
