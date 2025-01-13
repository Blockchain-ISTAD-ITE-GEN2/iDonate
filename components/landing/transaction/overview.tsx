"use client";
import { BarchartType } from "@/difinitions/types/chart/barchart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type OverviewProps = {
  data: BarchartType[];
};

export function Overview({ data }: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={480}>
      <BarChart data={data}>
        <XAxis dataKey="name"
               fontSize={12}
               tickLine={false}
               axisLine={false}
               style={{ fill: '#DCE3F0' }}

        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
          style={{ fill: '#DCE3F0' }}
        />

        <CartesianGrid
          className="stroke-1 stroke-iDonate-navy-accent"
          vertical={false} // Disable vertical grid lines, leaving only horizontal lines
        />

        {/* Bar for dataset1 */}
        <Bar
          dataKey="dataset1"
          radius={[4, 4, 0, 0]}
          name="Dataset 1"
          className="fill-iDonate-navy-secondary dark:fill-iDonate-navy-primary"
        />

        {/* Bar for dataset2 */}
        <Bar
          dataKey="dataset2"
          radius={[4, 4, 0, 0]}
          name="Dataset 2"
          className="fill-iDonate-green-secondary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
