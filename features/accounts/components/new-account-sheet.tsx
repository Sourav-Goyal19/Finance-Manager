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
import { useSession } from "next-auth/react";

const formFields = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formFields>;

const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  const { data } = useSession();
  const mutation = useCreateAccount(data?.user?.email!);

  const onSubmit = (data: FormValues) => {
    mutation.mutate(
      {
        name: data.name,
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
          <SheetTitle> New Account </SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default NewAccountSheet;
