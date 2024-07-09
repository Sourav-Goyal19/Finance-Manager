import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";
import { useUser } from "@/zustand/user";
import { useOpenAccount } from "../hooks/use-edit-account";

const formFields = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formFields>;

const EditAccountSheet = () => {
  const { isOpen, onClose } = useOpenAccount();
  const { user } = useUser();
  const mutation = useCreateAccount();

  const onSubmit = (data: FormValues) => {
    mutation.mutate(
      {
        name: data.name,
        userId: user?.id as string,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle> Edit Account </SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default EditAccountSheet;
