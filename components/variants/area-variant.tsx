import {
  Tooltip,
  AreaChart,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";
import { format } from "date-fns";
import { CustomTooltip } from "./custom-tooltip";

interface AreaVariantProps {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
}

export const AreaVariant: React.FC<AreaVariantProps> = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeWidth="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3d82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3d82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Area
          type="monotone"
          dataKey="income"
          stackId="income"
          strokeWidth={2}
          stroke="#3d82f6"
          fill="url(#income)"
          className="drop-shadow-sm"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stackId="expenses"
          strokeWidth={2}
          stroke="#f43f5e"
          fill="url(#expenses)"
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
