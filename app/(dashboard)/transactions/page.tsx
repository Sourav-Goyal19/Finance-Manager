import { Metadata } from "next";
import TransactionsPageClient from "./components/transactions-client";

export const metadata: Metadata = {
  title: "Transactions | FinFlow",
  description:
    "Easily manage your financial transactions with FinFlow. Create, edit, and view transactions with custom accounts and categories. Sort, search, and paginate through your financial history effortlessly.",
  openGraph: {
    title: "FinFlow - Smart Transaction Management",
    description:
      "Take control of your finances with FinFlow's transaction manager. Create detailed entries, customize categories, and efficiently organize your financial data.",
    type: "website",
    // url: 'https://finflow.com/transactions',
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "FinFlow Transactions Page",
      },
    ],
  },
};

const TransactionsPage = () => {
  return (
    <>
      <TransactionsPageClient />
    </>
  );
};

export default TransactionsPage;
