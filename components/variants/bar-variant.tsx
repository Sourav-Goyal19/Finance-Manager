import {
  Tooltip,
  Bar,
  BarChart,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { CustomTooltip } from "./custom-tooltip";

interface BarVariantProps {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
}

export const BarVariant: React.FC<BarVariantProps> = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
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
        <Bar dataKey="income" fill="#3d82f6" className="drop-shadow-sm" />
        <Bar dataKey="expenses" fill="#f43f5e" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};
