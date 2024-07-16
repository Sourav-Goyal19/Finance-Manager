import { Metadata } from "next";

import DataGrid from "@/components/data-grid";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { DataCharts } from "@/components/data-charts";

export const metadata: Metadata = {
  title: "FinFlow - Smart Finance Management",
  description:
    "FinFlow: Comprehensive finance manager with interactive charts. Import CSV files for easy tracking. Visualize your finances with customizable graphs.",
};

const DashboardPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full -mt-24 pb-10">
      <DataGrid user={user} />
      <DataCharts user={user} />
    </div>
  );
};

export default DashboardPage;
