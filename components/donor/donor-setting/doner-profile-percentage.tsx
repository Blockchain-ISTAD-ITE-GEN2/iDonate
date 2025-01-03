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

  image: {
    label: "Image",
    color: "hsl(var(--chart-1))",
  },

  fullName: {
    label: "Full Name",
    color: "hsl(var(--chart-2))",
  },

  email: {
    label: "Email",
    color: "hsl(var(--chart-3))",
  },

  contact: {
    label: "Contact",
    color: "hsl(var(--chart-4))",
  },

  address: {
    label: "Address",
    color: "hsl(var(--chart-5))",
  },

  bio: {
    label: "Bio",
    color: "hsl(var(--chart-6))",
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
      fill: normalizedPercentages[index] > 0 ? category.fill : "#FF0000", // Red for 0%
    }));

    // Calculate remaining percentage
    const totalCompletion = baseData.reduce(
      (acc, curr) => acc + curr.completion,
      0,
    );
    const remainingPercentage = Math.max(100 - totalCompletion, 0);

    // Add "Remaining" category only if needed
    if (remainingPercentage > 0) {
      baseData.push({
        category: "Remaining",
        completion: remainingPercentage,
        fill: "#DCE3F0",
      });
    }

    return baseData;
  }, [percentages]);

  return (
    <Card className="h-[580px] flex flex-col rounded-lg border-2 border-iDonate-navy-accent shadow-light">
      <CardHeader className="items-center pb-0">
        <CardTitle className="w-full text-title-eng text-center leading-9 text-iDonate-navy-primary whitespace-nowrap">
          Profile Completion
        </CardTitle>
      </CardHeader>

      <CardContent>
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
                            100,
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

      <CardContent className="flex flex-col gap-4">
        {chartData
          .filter((data) => data.category !== "Remaining") // Exclude "Remaining" from the list
          .map((data, index) => (
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
                <span className="text-medium-eng text-iDonate-navy-primary text-left whitespace-nowrap">
                  {data.category}
                </span>
              </div>
              <span className="text-medium-eng text-iDonate-green-primary text-left">
                {data.completion > 0 ? `${data.completion}%` : ""}
              </span>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
