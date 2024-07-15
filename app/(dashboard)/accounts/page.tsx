import { Metadata } from "next";
import AccountsPageClient from "./components/account-client";

export const metadata: Metadata = {
  title: "Accounts | FinFlow",
  description:
    "Efficiently manage your financial accounts with FinFlow. Create, edit, and organize your accounts in one place. Easy search and bulk operations for streamlined financial management.",
  openGraph: {
    title: "FinFlow - Streamlined Account Management",
    description:
      "Take control of your finances with FinFlow's account manager. Easily create, edit, and delete accounts. Search functionality and bulk operations for efficient organization.",
    type: "website",
    url: "https://finflow.com/accounts",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "FinFlow Accounts Management Page",
      },
    ],
  },
};

const AccountsPage = () => {
  return (
    <>
      <AccountsPageClient />
    </>
  );
};

export default AccountsPage;
