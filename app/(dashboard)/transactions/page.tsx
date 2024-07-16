import { Metadata } from "next";
import TransactionsPageClient from "./components/transactions-client";

export const metadata: Metadata = {
  title: "Transactions | FinFlow",
  description:
    "Easily manage your financial transactions with FinFlow. Create, edit, and view transactions with custom accounts and categories. Sort, search, and paginate through your financial history effortlessly.",
};

const TransactionsPage = () => {
  return (
    <>
      <TransactionsPageClient />
    </>
  );
};

export default TransactionsPage;
