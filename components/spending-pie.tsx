import { FileSearch, Loader2, PieChart, Radar, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { PieVariant } from "./variants/pie-variant";
import { RadarVariant } from "./variants/radar-variant";
import { RadialVariant } from "./variants/radial-variant";
import { Skeleton } from "@/components/ui/skeleton";

interface SpendingPieProps {
  data?: {
    name: string;
    value: number;
  }[];
}

export const SpendingPie: React.FC<SpendingPieProps> = ({ data = [] }) => {
  const [chartType, setChartType] = useState("pie");

  const onChartTypeChange = (type: string) => {
    setChartType(type);
  };

  return (
    <Card className="drop-shadow-sm border-none">
      <CardHeader className="flex lg:flex-row space-y-2 lg:space-y-0 lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
        <Select defaultValue={chartType} onValueChange={onChartTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Pie Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center">
                <Radar className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radar Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radial">
              <div className="flex items-center">
                <Target className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radial Chart</p>
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
            {chartType === "pie" && <PieVariant data={data} />}
            {chartType === "radar" && <RadarVariant data={data} />}
            {chartType === "radial" && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const SpendingPieLoading = () => {
  return (
    <Card className="drop-shadow-sm border-none">
      <CardHeader className="flex space-y-2 lg:flex-row lg:space-y-0 lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent className="h-[350px] w-full flex items-center justify-center">
        <Loader2 className="size-6 text-slate-300 animate-spin" />
      </CardContent>
    </Card>
  );
};
