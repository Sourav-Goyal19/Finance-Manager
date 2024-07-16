"use client";

import { Suspense } from "react";
import Filters from "./filters";
import { UserData } from "@/types";

interface ClientFiltersProps {
  user?: UserData | null;
}

const ClientFilters: React.FC<ClientFiltersProps> = ({ user }) => {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <Filters user={user} />
    </Suspense>
  );
};

export default ClientFilters;
