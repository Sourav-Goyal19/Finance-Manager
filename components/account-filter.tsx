"use client";

import { UserData } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import qs from "query-string";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AccountFilterProps {
  user?: UserData | null;
}

export const AccountFilter: React.FC<AccountFilterProps> = ({ user }) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const { data: accounts, isLoading: accountsLoading } = useGetAccounts(
    user?.email!
  );
  const { isLoading: summaryLoading } = useGetSummary(user?.email!);

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };

    if (newValue == "all") {
      query.accountId = "";
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  if (accountsLoading) {
    return <Skeleton className="w-full lg:w-auto h-9 rounded-md" />;
  }

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={accountsLoading || summaryLoading}
    >
      <SelectTrigger className="w-full lg:w-auto h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
        <SelectValue placeholder="Select Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
