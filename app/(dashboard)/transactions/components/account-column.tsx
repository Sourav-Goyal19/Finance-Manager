import { useOpenAccount } from "@/features/accounts/hooks/use-edit-account";

interface AccountColumnProps {
  account: string;
  accountId: string;
}

const AccountColumn: React.FC<AccountColumnProps> = ({
  account,
  accountId,
}) => {
  const { onOpen } = useOpenAccount();
  const handleClick = () => {
    onOpen(accountId);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </div>
  );
};

export default AccountColumn;
