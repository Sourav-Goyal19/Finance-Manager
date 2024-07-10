import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewCategory } from "../hooks/use-new-category";
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useCreateCategory } from "../api/use-create-category";
import { useSession } from "next-auth/react";

const formFields = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formFields>;

const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const { data } = useSession();
  const mutation = useCreateCategory(data?.user?.email!);

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
          <SheetTitle> New Category </SheetTitle>
          <SheetDescription>Create a new category.</SheetDescription>
        </SheetHeader>
        <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
