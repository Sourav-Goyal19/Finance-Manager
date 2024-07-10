import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { useOpenAccount } from "../hooks/use-edit-account";
import { useGetAccount } from "../api/use-get-account";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

const formFields = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formFields>;

const EditAccountSheet = () => {
  const { data } = useSession();
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction"
  );

  const accountQuery = useGetAccount(id!, data?.user?.email!);

  // console.log(accountQuery.data);

  const mutation = useEditAccount(id!, data?.user?.email!);
  const deleteMutation = useDeleteAccount(id!, data?.user?.email!);

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isPending = mutation.isPending || deleteMutation.isPending;

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = accountQuery.data && {
    name: accountQuery.data?.name,
  };

  return (
    <Sheet
      open={isOpen && accountQuery.data != undefined}
      onOpenChange={onClose}
    >
      <ConfirmDialog />
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle> Edit Account </SheetTitle>
          <SheetDescription>Edit an existing account.</SheetDescription>
        </SheetHeader>

        {accountQuery.isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            disabled={isPending}
            onDelete={onDelete}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditAccountSheet;
