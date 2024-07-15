"use client";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { UserData } from "@/types";
import { Chart, ChartLoading } from "./chart";
import { SpendingPie, SpendingPieLoading } from "./spending-pie";

interface DataChartsProps {
  user: UserData;
}

export const DataCharts: React.FC<DataChartsProps> = ({ user }) => {
  const { data, isLoading } = useGetSummary(user.email);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        {isLoading ? <ChartLoading /> : <Chart data={data?.days} />}
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        {isLoading ? (
          <SpendingPieLoading />
        ) : (
          <SpendingPie data={data?.categories} />
        )}
      </div>
    </div>
  );
};
