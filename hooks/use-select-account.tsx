import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const selectValue = useRef<string>();
  const { data } = useSession();

  const accountQuery = useGetAccounts(data?.user?.email!);
  const accountMutation = useCreateAccount(data?.user?.email!);

  const onCreateAccount = (name: string) => {
    accountMutation.mutate({ name });
  };
  const accountOptions = (accountQuery.data || []).map((account) => ({
    value: account.id,
    label: account.name,
  }));

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please select an account to continue
          </DialogDescription>
        </DialogHeader>
        <Select
          options={accountOptions}
          placeholder="Select an account"
          onCreate={onCreateAccount}
          onChange={(accountId) => {
            selectValue.current = accountId;
          }}
          disabled={accountMutation.isPending || accountQuery.isLoading}
        />
        <DialogFooter className="pt-2 gap-2 ">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};
