"use client";

import { useSession } from "next-auth/react";
import { Loader2, Plus } from "lucide-react";
import { columns, ResponseType } from "./column";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

const CategoriesPageClient = () => {
  const { onOpen } = useNewCategory();
  const { data: authdata } = useSession();
  const categoryQuery = useGetCategories(authdata?.user?.email!);
  const deleteCategories = useBulkDeleteCategories(authdata?.user?.email!);

  const isDisabled = categoryQuery.isLoading || deleteCategories.isPending;

  if (categoryQuery.isLoading) {
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

  const data: ResponseType[] = categoryQuery.data || [];
  return (
    <div className="max-w-screen-2xl mx-auto w-full -mt-24 pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
          <Button onClick={onOpen} size={"sm"}>
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            filterKey="name"
            onDelete={(rows) => {
              const ids = rows.map((r) => r.original.id);
              const deleted = deleteCategories.mutate({
                ids,
              });
              console.log(deleted);
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPageClient;
