import {
  Tooltip,
  Line,
  LineChart,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { CustomTooltip } from "./custom-tooltip";

interface LineVariantProps {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
}

export const LineVariant: React.FC<LineVariantProps> = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeWidth="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Line
          dot={false}
          dataKey="income"
          stroke="#3d82f6"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
        <Line
          dot={false}
          dataKey="expenses"
          stroke="#f43f5e"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
