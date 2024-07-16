import { Suspense } from "react";
import { Metadata } from "next";
import TransactionsPageClient from "./components/transactions-client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Transactions | FinFlow",
  description:
    "Easily manage your financial transactions with FinFlow. Create, edit, and view transactions with custom accounts and categories. Sort, search, and paginate through your financial history effortlessly.",
};

const TransactionsPage = () => {
  return (
    <Suspense fallback={<TransactionsPageFallback />}>
      <TransactionsPageClient />
    </Suspense>
  );
};

const TransactionsPageFallback = () => {
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
};

export default TransactionsPage;
