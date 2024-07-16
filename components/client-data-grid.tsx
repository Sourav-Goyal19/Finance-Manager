"use client";

import { Suspense } from "react";
import DataGrid from "./data-grid";
import { UserData } from "@/types";
import { DataCardLoading } from "./data-card";

interface ClientDataGridProps {
  user: UserData;
}

const ClientDataGrid: React.FC<ClientDataGridProps> = ({ user }) => {
  return (
    <Suspense fallback={<DataGridLoading />}>
      <DataGrid user={user} />
    </Suspense>
  );
};

const DataGridLoading = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
    <DataCardLoading />
    <DataCardLoading />
    <DataCardLoading />
  </div>
);

export default ClientDataGrid;
