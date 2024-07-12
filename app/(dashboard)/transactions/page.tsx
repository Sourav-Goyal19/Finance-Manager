"use client";

import { useSession } from "next-auth/react";
import { Loader2, Plus } from "lucide-react";
import { columns, ResponseType } from "./components/column";

import FetchUser from "@/components/fetch-user";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";

const transactionsPage = () => {
  const { data: authdata } = useSession();
  const { onOpen } = useNewTransaction();
  const TransactionQuery = useGetTransactions(authdata?.user?.email!);
  const deletetransactions = useBulkDeleteTransactions(authdata?.user?.email!);

  const isDisabled = TransactionQuery.isLoading || deletetransactions.isPending;

  if (TransactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full -mt-24 pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-12 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const data: ResponseType[] = TransactionQuery.data || [];
  return (
    <>
      <div className="max-w-screen-2xl mx-auto w-full -mt-24 pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Transactions History
            </CardTitle>
            <Button onClick={onOpen} size={"sm"}>
              <Plus className="size-4 mr-2" />
              Add New
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data}
              filterKey="payee"
              onDelete={(rows) => {
                const ids = rows.map((r) => r.original.id);
                const deleted = deletetransactions.mutate({
                  ids,
                });
                console.log(deleted);
              }}
              disabled={isDisabled}
            />
          </CardContent>
        </Card>
      </div>
      <FetchUser />
    </>
  );
};

export default transactionsPage;
