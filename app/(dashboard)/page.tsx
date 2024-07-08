"use client";
import FetchUser from "@/components/fetch-user";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useUser } from "@/zustand/user";

const DashboardPage = () => {
  const { user } = useUser();
  const { data: accounts, isLoading, isError } = useGetAccounts(user?.id!);
  console.log(accounts);

  return (
    <>
      <div>Dashboard Page</div>
      <FetchUser />
    </>
  );
};

export default DashboardPage;
