"use client";
import FetchUser from "@/components/fetch-user";
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useUser } from "@/zustand/user";

const DashboardPage = () => {
  const { user } = useUser();
  const { data: accounts, isLoading, isError } = useGetAccounts(user?.id!);
  console.log(accounts);
  const { onOpen } = useNewAccount();
  return (
    <>
      <div>Dashboard Page</div>
      <Button onClick={onOpen}>Open Panel</Button>
      <FetchUser />
    </>
  );
};

export default DashboardPage;
