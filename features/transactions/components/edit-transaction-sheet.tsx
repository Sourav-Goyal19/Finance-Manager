import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import { TransactionForm } from "./transaction-form";
import { insertTransactionsSchema } from "@/db/schema";
import { useOpenTransaction } from "../hooks/use-edit-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";

const formFields = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formFields>;

const EditTransactionSheet = () => {
  const { data } = useSession();
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this Transaction"
  );

  const TransactionQuery = useGetTransaction(id!, data?.user?.email!);

  // console.log(TransactionQuery.data);

  const mutation = useEditTransaction(id!, data?.user?.email!);
  const deleteMutation = useDeleteTransaction(id!, data?.user?.email!);

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

  const defaultValues = TransactionQuery.data && {
    ...TransactionQuery.data.transactions,
  };

  return (
    <Sheet
      open={isOpen && TransactionQuery.data != undefined}
      onOpenChange={onClose}
    >
      <ConfirmDialog />
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle> Edit Transaction </SheetTitle>
          <SheetDescription>Edit an existing Transaction.</SheetDescription>
        </SheetHeader>

        {TransactionQuery.isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <TransactionForm
            id={id}
            onSubmit={() => {}}
            defaultValues={{}}
            disabled={isPending}
            onDelete={onDelete}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditTransactionSheet;
