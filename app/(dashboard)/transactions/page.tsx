import { Suspense } from "react";
import { Metadata } from "next";
import TransactionsPageClient from "./components/transactions-client";

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
    <div>
      <h1>Transactions</h1>
      <p>Loading transactions...</p>
    </div>
  );
};

export default TransactionsPage;
