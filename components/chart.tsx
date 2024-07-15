import {
  AreaChart,
  BarChart3,
  FileSearch,
  LineChart,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaVariant } from "./variants/area-variant";
import { BarVariant } from "./variants/bar-variant";
import { LineVariant } from "./variants/line-variant";
import { useState } from "react";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartProps {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
}

export const Chart: React.FC<ChartProps> = ({ data = [] }) => {
  const [chartType, setChartType] = useState<"line" | "area" | "bar">("area");

  const onChartTypeChange = (type: "line" | "area" | "bar") => {
    setChartType(type);
  };

  return (
    <Card className="drop-shadow-sm border-none">
      <CardHeader className="flex lg:flex-row space-y-2 lg:space-y-0 lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={onChartTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Area Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Line Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart3 className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Bar Chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length == 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p>No data for this period</p>
          </div>
        ) : (
          <>
            {chartType === "area" && <AreaVariant data={data} />}
            {chartType === "line" && <LineVariant data={data} />}
            {chartType === "bar" && <BarVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const ChartLoading = () => {
  return (
    <Card className="drop-shadow-sm border-none">
      <CardHeader className="flex lg:flex-row space-y-2 lg:space-y-0 lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent className="h-[350px] flex items-center justify-center">
        <Loader2 className="size-6 text-slate-300 animate-spin" />
      </CardContent>
    </Card>
  );
};
