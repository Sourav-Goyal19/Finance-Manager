import getCurrentUser from "@/actions/getCurrentUser";
import { DataCharts } from "@/components/data-charts";
import DataGrid from "@/components/data-grid";
import { redirect } from "next/navigation";

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
