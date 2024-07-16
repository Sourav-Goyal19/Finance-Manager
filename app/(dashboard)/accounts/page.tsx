import { Metadata } from "next";
import AccountsPageClient from "./components/account-client";

export const metadata: Metadata = {
  title: "Accounts | FinFlow",
  description:
    "Efficiently manage your financial accounts with FinFlow. Create, edit, and organize your accounts in one place. Easy search and bulk operations for streamlined financial management.",
};

const AccountsPage = () => {
  return (
    <>
      <AccountsPageClient />
    </>
  );
};

export default AccountsPage;
