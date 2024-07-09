"use client";
import FetchUser from "@/components/fetch-user";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

const DashboardPage = () => {
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
